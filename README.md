# The Panik-Baxter Scale
### A System of Objective(ish) Film Rating

https://michaelpanik.github.io/panik-baxter-scale/

The Panik-Baxter Scale is an attempted to take opinions out of the rating of films, and look at them through a truly objective eye. By breaking down a film into five major categories, each with a set of subcategories that ask for the reviewers' evaluation of a highly-specific aspect of the film, the final score can be seen as a reflection of the quality of the film as a whole, rather than the opinions of a few.

Each subcategory is scaled using the Golden Ratio, in a further attempt to be unopinionated and honest. A system of pair-wise evaluation was used to determine the hierarchy of categories and sub-categories. They were then assigned ratio values starting with 1 that would then be used to scale the final composite score of both the subcategories and categories.

The final composite score is, essentially, a composite of a composite.

In terms of the web interface, everything is pure, Vanilla ES6 JS. The form is generated based on the configuration file rather than by hand in HTML for quick edits and maintenance.

## To do
1. N/A option for certain subcategories (score/soundtrack, audio in silent pictures)
1. Configure backend system for storing all ratings
1. Get averaged master rating from backend
1. Bell curve system for master ratings after 5 have been submitted
1. Different scales for different genres
