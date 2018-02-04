const clientPromise = stitch.StitchClientFactory.create('panik-baxter-scale-ptflh')

let client, db

clientPromise.then(stitchClient => {
  client = stitchClient
  db = client.service('mongodb', 'mongodb-atlas').db('pbs')

  client.login().catch(err => {
    console.error(err)
  })
})

function addRating(film, score) {
  db.collection('ratings').insertOne({filmName: film, score: score})
}

function getRatings(query) {
  db.collection('ratings')
    .find({ filmName: { $eq: query } })
    .execute()
    .then(docs => {
      console.log(docs)
    })
}
