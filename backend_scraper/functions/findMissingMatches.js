function amsterdamUrl(seasonXref, teamXref) {
  return `http://leagues2.amsterdambilliards.com/8ball/abc/team_scouting_report.php?season_id=${seasonXref}&team_id=${teamXref}`
}

exports = function({ body }) {
  const { seasonXref, weekNum } = JSON.parse(body.text())
  return context.services.get('mongodb-atlas').db('amsterdam').collection('teams')
    .aggregate([
      { $match: { season_xref: seasonXref } },
      { $unwind: { path: '$schedule', includeArrayIndex: 'week_num' } },
      { $match: {
        'schedule.match_id': { '$exists': false },
        week_num: { $lte: weekNum - 1 }
      } },
      { $group: {
        _id: '$xref',
        name: { $first: '$name' },
        division_name: { $first: '$division_name' },
        missing_weeks: { '$push': { '$add': ['$week_num', 1] } }
      } },
      { $project: {
        _id: 0,
        xref: '$_id',
        name: '$name',
        missing_weeks: 1,
        order: { $indexOfArray: [
          ['Mosconi Division', 'Lassiter Division', 'Crane Division', 'Hoppe Division', 'Greenleaf Division', 'Caras Division'],
          '$division_name'
        ] }
      } },
      { $sort: { order: 1, name: 1 } },
      { $project: { order: 0 } },
      
    ])
    .toArray()
    .then(docs => docs.map(({ xref, ...doc }) => ({
      ...doc,
      url: amsterdamUrl(seasonXref, xref)
    })));
};