// const payload = `[{"weekNum":9,"date":"2022-07-19T04:00:00.000Z","leftTeamName":"MonGods","rightTeamName":"I Rack I Run","playerMatches":[{"seq":0,"type":"R1","leftPlayer":{"name":"Jonathan Lee","xref":41,"handicap":3,"games":3},"rightPlayer":{"name":"Billy Cai","xref":97,"handicap":5,"games":5}},{"seq":1,"type":"R1","leftPlayer":{"name":"Corey Brewer","xref":45,"handicap":5,"games":5},"rightPlayer":{"name":"Russell Wilcox","xref":95,"handicap":6,"games":2}},{"seq":2,"type":"R2","leftPlayer":{"name":"Lyon Chen","xref":42,"handicap":5,"games":3},"rightPlayer":{"name":"Anthony Atterberry","handicap":5,"games":2}},{"seq":3,"type":"R2","leftPlayer":{"name":"Jonathan Lee","xref":41,"handicap":3,"games":5},"rightPlayer":{"name":"Drew Ranieri","xref":98,"handicap":4,"games":0}}],"fifthSet":false}]`
exports = async function({ body }){
  const { seasonXref, matches } = JSON.parse(body.text())
  // const seasonXref = 208
  // const matches = JSON.parse(payload)
  
  console.log(JSON.stringify(matches))
  
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  
  const season = await db.collection('seasons').findOne({ xref: seasonXref })
  
  const teams = await db.collection('teams').find({
    name: { '$in': [matches[0].leftTeamName, ...matches.map(match => match.rightTeamName)] }
  }).toArray();
  const teamsByName = teams.reduce((acc, team) => ({ ...acc, [team.name]: team }), {})
  
  const teamMatches = []
  const playerMatchGroups = []
  
  matches.forEach(({ weekNum, date: dateStr, leftTeamName, rightTeamName, playerMatches, fifthSet }) => {
    const date = parseDate(dateStr)
    
    const leftTeamXref = teamsByName[leftTeamName].xref;
    const rightTeamXref = teamsByName[rightTeamName].xref;
    
    const total = {
      leftTeamGames: 0,
      leftTeamMatches: 0,
      rightTeamGames: 0,
      rightTeamMatches: 0,
    };
    
    playerMatchGroups.push(playerMatches.map(({ seq, type, leftPlayer: lp, rightPlayer: rp, forfeit }) => {
      const leftPlayer = {
        name: lp.name,
        xref: lp.xref,
        team: { name: leftTeamName, xref: leftTeamXref },
        handicap: lp.handicap,
        games_won: lp.games
      }
      const rightPlayer = {
        name: rp.name,
        xref: rp.xref,
        team: { name: rightTeamName, xref: rightTeamXref },
        handicap: rp.handicap,
        games_won: rp.games
      }
      total.leftTeamGames += lp.games
      total.rightTeamGames += rp.games
      if (lp.games > rp.games) {
        leftPlayer.win = true
        rightPlayer.loss = true
        total.leftTeamMatches++
      } else {
        leftPlayer.loss = true
        rightPlayer.win = true
        total.rightTeamMatches++
      }
      const playerMatch = {
        season_name: season.name,
        season_xref: seasonXref,
        week_num: weekNum,
        date,
        seq,
        type,
        players: [leftPlayer, rightPlayer]
      }
      if (forfeit) {
        playerMatch.forfeit = true
      }
      return playerMatch
    }))
    
    const leftTeam = {
      name: leftTeamName,
      xref: leftTeamXref,
      games_won: total.leftTeamGames,
      matches_won: total.leftTeamMatches
    }
    
    const rightTeam = {
      name: rightTeamName,
      xref: rightTeamXref,
      games_won: total.rightTeamGames,
      matches_won: total.rightTeamMatches
    }
    
    if (total.leftTeamMatches > total.rightTeamMatches) {
      leftTeam.win = true
      rightTeam.loss = true
    } else if (total.rightTeamMatches > total.leftTeamMatches) {
      leftTeam.loss = true
      rightTeam.win = true
    } else {
      if (total.leftTeamGames > total.rightTeamGames) {
        leftTeam.win = true
        rightTeam.loss = true
      } else if (total.rightTeamGames > total.leftTeamGames) {
        leftTeam.loss = true
        rightTeam.win = true
      }
    }
    
    const teamMatch = {
      season_name: season.name,
      season_xref: seasonXref,
      week_num: weekNum,
      date,
      teams: [leftTeam, rightTeam]
    }
    if (fifthSet) {
      teamMatch.fifth_set = true;
    }
    
    teamMatches.push(teamMatch)
  })
  
  const teamMatchDocs = await Promise.all(
    teamMatches.map(teamMatch => db.collection('team_matches').findOneAndReplace(
      {
        season_xref: teamMatch.season_xref,
        week_num: teamMatch.week_num,
        '$and': [{ 'teams.xref': teamMatch.teams[0].xref }, { 'teams.xref': teamMatch.teams[1].xref }]
      },
      teamMatch,
      { upsert: true, returnNewDocument: true }
    ))
  )
  const teamMatchIds = teamMatchDocs.map(doc => doc._id);
  
  const teamDocs = await Promise.all(
    teamMatches.flatMap((teamMatch, idx) => teamMatch.teams.map(team => db.collection('teams').updateOne(
      { xref: team.xref },
      { '$set': { [`schedule.${teamMatch.week_num-1}.match_id`]: teamMatchIds[idx] } }
    )))
  )
  
  const playerMatchUpdateGroups = await Promise.all(
    playerMatchGroups.map((playerMatches, idx) => Promise.all(
      playerMatches.map(playerMatch => db.collection('player_matches').replaceOne(
        {
          season_xref: playerMatch.season_xref,
          week_num: playerMatch.week_num,
          seq: playerMatch.seq,
          '$and': [{ 'players.xref': playerMatch.players[0].xref }, { 'players.xref': playerMatch.players[1].xref }]
        },
        { ...playerMatch, match_id: teamMatchDocs[idx]._id },
        { upsert: true }
      ))
    ))
  )
  
  return {
    teamMatches: teamMatches.reduce(
      (acc, teamMatch, idx) => ([
        ...acc,
        {
          seasonXref: teamMatch.season_xref,
          weekNum: teamMatch.week_num,
          teams: teamMatch.teams.map(t => t.name),
          match_id: teamMatchIds[idx]
        },
      ]),
      []
    ),
    teamSchedules: teamDocs.reduce(
      (acc, { matchedCount, modifiedCount, upsertedId }, j) => {
          return {
            requests: acc.requests + 1,
            matches: acc.matches + matchedCount,
            updates: acc.updates + modifiedCount,
            upserts: acc.upserts + (!upsertedId ? 0 : 1)
          }
        },
        { requests: 0, matches: 0, updates: 0, upserts: 0 }
    ),
    playerMatches: playerMatchUpdateGroups.reduce((acc, playerMatchUpdates, i) => ({
      ...acc,
      [teamMatchIds[i]]: playerMatchUpdates.reduce(
        (acc, { matchedCount, modifiedCount, upsertedId }, j) => {
          return {
            requests: acc.requests + 1,
            matches: acc.matches + matchedCount,
            updates: acc.updates + modifiedCount,
            upserts: acc.upserts + (!upsertedId ? 0 : 1),
            missed: !matchedCount && !upsertedId ? [...acc.missed, playerMatchGroups[i][j]] : acc.missed
          }
        },
        { requests: 0, matches: 0, updates: 0, upserts: 0, missed: [] }
      )
    }), {})
  };
};

function parseDate(date) {
  return new Date(date.split('T')[0]+'T19:00:00.000+04:00')
}
