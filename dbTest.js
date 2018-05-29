const stitch = require("mongodb-stitch")
const clientPromise = stitch.StitchClientFactory.create('bd2go-wirco');
clientPromise.then(client => {
  const db = client.service('mongodb', 'mongodb-atlas').db('bd2go');
  client.login().then(() =>
    db.collection('contacts').updateOne({owner_id: client.authedId()}, {$set:{
      type: 'myOrg',
      name: 'Flying High Creative, LLC'
    }}, {upsert:true})
  ).then(() =>
    db.collection('contacts').find({owner_id: client.authedId()}).limit(100).execute()
  ).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
  }).catch(err => {
    console.error(err)
  });
});
