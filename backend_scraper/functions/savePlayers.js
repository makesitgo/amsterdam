exports = async function({ body }) {
    const players = JSON.parse(body.text());
    
    const db = context.services.get('mongodb-atlas').db('amsterdam');
    
    const playerDocs = await db.collection('players').find({}).toArray()
    const playersByXref = playerDocs.reduce((acc, player) => ({
      ...acc,
      [player.xref]: player
    }), {})
    
    const res = await Promise.all(players
      .filter(player => !playersByXref[player.xref])
      .map(({ xref, name, aka }) => {
        const doc = { xref, name }
        if (aka && aka.length > 0) {
          doc.aka = aka
        }
        return db.collection('players').updateOne(
          { xref: doc.xref },
          doc,
          { upsert: true }
        )
      })
    )
    
    return res.reduce((acc, { matchedCount, modifiedCount, upsertedId }) => ({
      matches: acc.matches + matchedCount,
      updates: acc.updates + modifiedCount,
      upserts: acc.upserts + (!upsertedId ? 0 : 1),
    }), { matches: 0, updates: 0, upserts: 0 })
};
