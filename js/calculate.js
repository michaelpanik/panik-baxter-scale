/*
 * This file calculates the final weighted scores
 */

// Calculate the final score.
function calculateCompositeScore(results) {
  let total = 0,
      multiplier = 0

  for (let category in results) {
    total += calculateCategoryScore(results[category]["scores"])*results[category]["scale"]
    multiplier += results[category]["scale"]
  }

  compositeScore = Math.round((total/multiplier)*10)/10

  showResults(compositeScore)
}

// Calculate the subcategory score
function calculateCategoryScore(array) {
  let total = 0,
      multiplier = 0

  for (let subcategory of array) {
    total += subcategory[0]*subcategory[1]
    multiplier += subcategory[0]
  }

  // return total/multiplier
  return total/multiplier
}
