exports = async function(){
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  
  const playerMatches = await db.collection('player_matches_bak').find({}).toArray()
  
  /*

export interface LeaguePlayerResult {
  name: string;
  team: AmsterdamKey;
  handicap: number;
  games_won: number;
  win?: boolean;
  loss?: boolean;
}
  */
  
  const docs = playerMatches.map(playerMatch => {
    const leftPlayer = {
      xref: playerMatch.left_player.code,
      name: playerMatch.left_player.name,
      team: {
        xref: playerMatch.left_player.team_code,
        name: playerMatch.left_player.team_name
      },
      handicap: playerMatch.left_player.handicap,
      games_won: playerMatch.left_player.games_won
    };
    if (playerMatch.left_player.win) {
      leftPlayer.win = true
    } else if (playerMatch.left_player.loss) {
      leftPlayer.loss = true
    }
    
    const rightPlayer = {
      xref: playerMatch.right_player.code,
      name: playerMatch.right_player.name,
      team: {
        xref: playerMatch.right_player.team_code,
        name: playerMatch.right_player.team_name
      },
      handicap: playerMatch.right_player.handicap,
      games_won: playerMatch.right_player.games_won
    };
    if (playerMatch.right_player.win) {
      rightPlayer.win = true
    } else if (playerMatch.right_player.loss) {
      rightPlayer.loss = true
    }
    
    const out = {
      season_xref: 208,
      season_name: playerMatch.season_name,
      week_num: playerMatch.week_num,
      date: parseDate(playerMatch.date),
      type: playerMatch.type,
      seq: playerMatch.seq,
      players: [leftPlayer, rightPlayer],
    };
    if (playerMatch.is_forfeit) {
      out.forfeit = true
    }
    return out;
  });
  
  return db.collection('player_matches').insertMany(docs);
};

function parseDate(date) {
  return new Date(date.split('T')[0]+'T19:00:00.000+04:00')
}