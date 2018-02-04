const clientPromise = stitch.StitchClientFactory.create('panik-baxter-scale-ptflh')

let client, db

clientPromise.then(stitchClient => {
  client = stitchClient
  db = client.service('mongodb', 'mongodb-atlas').db('pbs')

  db.collection('ratings').find().execute().then(docs => console.log(docs))

  client.login().catch(err => {
    console.error(err)
  })
})

function addRating(film, score) {
  db.collection('ratings').insertOne({filmName: film, score: score})
    .then(console.log(film, score))
}
