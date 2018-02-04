/*
 * This file calculates the final weighted scores
 */

// Calculate the subcategory score
function calculateScore(array) {
  let total = 0,
      divisor = 0

  total = array.reduce( (a,x) => a += (x[0] * x[1]), 0 )
  divisor = array.reduce( (a,x) => a + (x[0]), 0 )

  return total/divisor
}


function calculateCompositeScore(results) {
  results = results.map( x => new Array( x[0], calculateScore(x[1]) ) )

  const compositeScore = Math.round(calculateScore(results)*10)/10

  return Number(compositeScore)
}
