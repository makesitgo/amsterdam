exports = async function(){
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  
  const teamMatches = await db.collection('team_matches_bak').find({}).toArray()
  
  const docs = teamMatches.map(teamMatch => {
    const leftTeam = {
      name: teamMatch.left_team.name,
      games_won: teamMatch.left_team.games_won,
      matches_won: teamMatch.left_team.matches_won,
    };
    if (teamMatch.left_team.win) {
      leftTeam.win = true
    } else if (teamMatch.left_team.loss) {
      leftTeam.loss = true
    }
    
    const rightTeam = {
      name: teamMatch.right_team.name,
      games_won: teamMatch.right_team.games_won,
      matches_won: teamMatch.right_team.matches_won,
    };
    if (teamMatch.right_team.win) {
      rightTeam.win = true
    } else if (teamMatch.right_team.loss) {
      rightTeam.loss = true
    }
    
    const out = {
      season_xref: teamMatch.season_code,
      season_name: teamMatch.season_name,
      week_num: teamMatch.week_num,
      date: parseDate(teamMatch.date),
      teams: {
        [teamMatch.left_team.code]: leftTeam,
        [teamMatch.right_team.code]: rightTeam,
      },
    };
    if (teamMatch.fifth_set) {
      out.fifth_set = true
    }
    return out;
  });
  
  return db.collection('team_matches').insertMany(docs);
};

function parseDate(date) {
  return new Date(date.split('T')[0]+'T19:00:00.000+04:00')
}