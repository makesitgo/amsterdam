exports = async function(){
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  
  const teams = await db.collection('teams').find({}).toArray();
  
  const schedules = await db.collection('schedule').find({}).toArray();
  const schedulesByNight = schedules.reduce((acc, week) => {
    const night = week.season.day.toLowerCase()
    return {
    ...acc,
    [night]: [
      ...(acc[night] || []),
      { num: week.week_num, name: week.week_name, date: parseDate(week.date) }
    ]
  }
  }, {});
  
  Object.entries(schedulesByNight).forEach(([night, schedule]) => {
    schedule.sort((w1, w2) => w1.num - w2.num)
    schedulesByNight[night] = schedule
  })
  
  const teamMatches = await db.collection('team_matches').find({}).toArray();
  const teamMatchesByXrefAndWeek = teamMatches.reduce((outer, teamMatch) => {
    const t1 = teamMatch.teams[0]
    const t2 = teamMatch.teams[1]
    
    let matchId
    if (teamMatch.teams.some(t => t.games_won > 0)) {
      matchId = teamMatch._id
    }
    
    return {
      ...outer,
      [t1.xref]: {
        ...(outer[t1.xref] || {}),
        [teamMatch.week_num]: { matchId, opp: { xref: t2.xref, name: t2.name } },
      },
      [t2.xref]: {
        ...(outer[t2.xref] || {}),
        [teamMatch.week_num]: { matchId, opp: { xref: t1.xref, name: t1.name } },
      },
    }
  }, {});
  
  const teamSchedules = {};
  for (var i = 0; i < teams.length; i++) {
    const team = teams[i];
    const weeks = schedulesByNight[team.night];
    
    const schedule = [];
    for (var j = 0; j < weeks.length; j++) {
      const week = weeks[j];
      const teamMatch = teamMatchesByXrefAndWeek[team.xref][week.num];
      
      const match = { opp: teamMatch.opp }
      if (teamMatch.matchId) {
        match.match_id = teamMatch.matchId;
      }
      
      schedule.push({ display: week.name, date: week.date, ...match })
    }
    
    teamSchedules[team.xref] = schedule
  }teamSchedules
  
  return Promise.all(teams.map(team => db.collection('teams').updateOne(
    { xref: team.xref },
    { '$set': { schedule: teamSchedules[team.xref] } },
  ))).then(res => res.reduce((acc, r) => ({
    matchedCount: acc.matchedCount + r.matchedCount,
    modifiedCount: acc.modifiedCount + r.modifiedCount,
  }), { matchedCount: 0, modifiedCount: 0 }));
};

function parseDate(date) {
  return new Date(date.split('T')[0]+'T19:00:00.000+04:00')
}