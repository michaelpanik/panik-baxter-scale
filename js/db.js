const clientPromise = stitch.StitchClientFactory.create('panik-baxter-scale-ptflh')

let client, db

function displayRatingsOnLoad() {
   clientPromise.then(stitchClient => {
       client = stitchClient;
       db = client.service('mongodb', 'mongodb-atlas').db('pbs')
       return client.login().then(displayRatings)
   })
}

function displayRatings() {
  db.collection('ratings').find({}).execute().then(docs => {
    renderRatingsList(docs)
  })
}
