const clientPromise = stitch.StitchClientFactory.create('panik-baxter-scale-ptflh')

let client, db

function db_getRatingsOnLoad() {
   clientPromise.then(stitchClient => {
       client = stitchClient;
       db = client.service('mongodb', 'mongodb-atlas').db('pbs')
       return client.login()
   })
}

function db_getRatings() {
  db.collection('ratings').find({}).execute().then(docs => {
    renderRatingsList(docs)
  })
}

function db_getAggregateScore(filmID) {

  let args, results

  //If no filmID arg is passed, just get all aggregate scores
  if(!filmID) {
    args = [
      { $group: { _id: "$filmID", filmTitle: { $first: "$filmTitle" }, aggregateScore: { $avg: "$rating" } } }
    ]
  }
  // If there is one, only get results that match it
  else {
    args = [
      { $match: { "filmID": filmID } },
      { $group: { _id: "$filmID", filmTitle: { $first: "$filmTitle" }, aggregateScore: { $avg: "$rating" } } }
    ]
  }

  // pass in our args to a db call and pull back some nice aggregated data
  db.collection('ratings')
    .aggregate(args)
    .then(docs => {
       showRatings(docs)
    })
}

function db_storeRating(reviewersName, filmID, filmTitle, rating) {
  db.collection('ratings').insertOne({
    reviewersName: reviewersName,
    filmID: filmID,
    filmTitle: filmTitle,
    rating: rating,
  })
}
