exports = async function(){
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  
  const players = await db.collection('players_bak').find({}).toArray()
  
  return db.collection('players').insertMany(players.map(({ key, name, aka }) => ({ xref: key, name, aka })))
};