/*
 * This file acts as the primary constructor of the web form.
 */

// Create a field-group with a title, description, and 1-10 radio buttons
function createRatingField(title, slug, desc, scale) {
		let html, checked

		html = `<div class="form-group mb-4" id="${slug}" data-subcategory-scale="${scale}">`
		html += `<h3>${title}</h3>`
		html += `<p>${desc}</p>`

		for (let i = 1; i <= 11; i++) {
				if (i === 5) {
					checked = "checked"
				} else {
					checked = ""
				}

				html +=	`<div class="form-check form-check-inline">
									 <input class="form-check-input" type="radio" name="${slug}" value="${i}" ${checked}>
								 	 <label class="form-check-label" for="${i}">${i}</label>
								 </div>`
		}

		html += `</div>`

		return html
}

// Create a fieldset to hold category field-groups
function createFieldSet(title, subcategories, desc, scale) {
	const slug = title.replace(/\s+/g, '-').toLowerCase();

	let html

	html = `<fieldset class="mb-5" id="${slug}" data-category-scale="${scale}">`
	html += `<h2 class="mb-3 pb-2 border-bottom">${title}</h2>`
	html += `<section class="pl-3 pr-3">`

	for (let i in subcategories) {
		let title = subcategories[i].title,
				slug = title.replace(/\s+/g, '-').toLowerCase(),
				desc = subcategories[i].description,
				scale = subcategories[i].scale

		html += createRatingField(title, slug, desc, scale)
	}

	html += `</section>`
	html += `</fieldset>`

	return html
}

// Render the form based on fields object using createFieldSet()
function renderFields() {
	let output = []
	
	for (i in fields) {
		let title = fields[i].title,
				desc = fields[i].description,
				scale = fields[i].scale,
				subcategories = fields[i].subcategories

		output += createFieldSet(title, subcategories, desc, scale)
	}

	$("#categories").html(output)
}

renderFields()

function generateStarRating(score) {
	let stars = ""

	score = Math.round((score/2)*2)/2

	for (var i = 0; i < Math.floor(score); i++) {
		stars += "<i class='fas fa-star rating-star'></i>"
	}

	if (score % 1 != 0) {
		stars += "<span class='half-star rating-star'><i class='fas fa-star-half'></i><i class='far fa-star-half'></i></span>"

		for (var i = 0; i < 4-score; i++) {
			stars += "<i class='far fa-star rating-star'></i>"
		}
	} else {
		for (var i = 0; i < 5-score; i++) {
			stars += "<i class='far fa-star rating-star'></i>"
		}
	}

	stars = `<p class='text-center'>${stars}</p>`

	return stars
}

function showResults(compositeScore) {
	const $modal = $("#results"),
				$modalContent = $modal.find('.modal-body')

	let output

	output = `<h1 class="composite-score text-center">${compositeScore}<small>/10</small></h1>`
	output += generateStarRating(compositeScore)
	output += `Your Panik-Baxter composite film rating is <strong>${compositeScore}</strong>. Thanks for participating!`

	$modalContent.html(output)
	$modal.modal()
}
