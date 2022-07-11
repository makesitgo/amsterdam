exports = function(){
  const coll = 'player_matches'
  const db = context.services.get('mongodb-atlas').db('amsterdam');
  return db
    .collection(coll)
    .find({})
    .toArray()
    .then(docs => db.collection(coll+'_bak').insertMany(docs))
};