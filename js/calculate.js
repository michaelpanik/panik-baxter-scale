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
  let total = 0,
      divisor = 0,
      categoryScores = []

  for (let i of results) {
    categoryScores.push([i[0], calculateScore(i[1])])
  }

  compositeScore = Math.round(calculateScore(categoryScores)*10)/10
  showResults(compositeScore)
}
