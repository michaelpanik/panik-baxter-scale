/*
 *  This code tallies the scores for each subcategory and packages them to be
 *  calculated after the form has been submitted.
 */

// Gets the score of any "subcategory". Pass in the "name" attr of a group of
// radio buttons, and it returns the value of the checked radio.
function getSubcategoryScore(name) {
  if (typeof name == "string") {
    const form = document.getElementById("rating"),
          elements = form.elements[name]

    let checked

    for (let element of elements) {
      if (element.checked) {
        return element.value
      }
    }

    return checked
  } else {
    throw new Error('Function getSubcategoryScore() requires one argument of type string.')
  }
}

// Returns an object of all scores in a category, based on the fieldset ID that
// is passed to it. It will find all .field-groups within that fieldset and
// send them to getSubcategoryScore() for the value. Returned values are added
// to a "scores" array in the output object.
function getCategoryScores(fieldset) {
  fieldset = document.querySelector(`fieldset#${fieldset}`)

  const allFields = [...fieldset.querySelectorAll('.form-group')]

  let results = [
    Number(fieldset.dataset.categoryScale),
    []
  ]

  for (let field of allFields) {
      let name = field.id,
          scale = field.dataset.subcategoryScale

      results[1].push([Number(scale), Number(getSubcategoryScore(name.toString()))])
  }

  return results
}

// "Constructor" of this module. Gets all fieldsets within the submitting form
// and returns an object of objects, one per category.
function validateForm(event)  {
  event.preventDefault()

  const categories = [...event.target.querySelectorAll('fieldset')]

  let results = []

  for (let category of categories) {
    let categoryName = category.id

    results.push(getCategoryScores(categoryName.toString()))
  }

  calculateCompositeScore(results)
}
