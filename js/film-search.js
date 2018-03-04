//TODO: I think the liveSearch() is handling the selection poorly. Needs to be
// its own function, probably do some other cool stuff when it's called.

function liveSearch() {
  let input = event.target.value

  const $dataList = $('datalist#films')

  if(input.length >= 3) {
    html = [...queryFilms(input)].map(x => `<option value="${x.title}" data-id="${x.id}">`)
    $dataList.html(html.join(''))
  }

  let option = $dataList.find("[value='" + input + "']")

  if(option.length > 0) {
    var id = option.data('id')
    $('input#filmID').val(id)
    
    $dataList.html('')
  }
}

function queryFilms(query) {
  query = query.replace(/\s/, "-")

  let results = []

  $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=20335e49e1179cf9d833f158009d13d9&language=en-US&query=${query}&page=1&include_adult=false`,
      type: 'get',
      dataType: 'JSON',
      async: false,
      success: function(data){
        results = data.results
      }
  })

  if (results.length > 0) {
    return results
  } else {
    return []
  }
}

function getFilmDetails(film_id) {
  let filmDetails = {}

  $.ajax({
      url: `https://api.themoviedb.org/3/movie/${film_id}?api_key=20335e49e1179cf9d833f158009d13d9&language=en-US`,
      type: 'get',
      dataType: 'JSON',
      async: false,
      success: function(data){
        filmDetails = {
          title: data.results.title,
          release_date: `http://image.tmdb.org/t/p/w500/${data.results.release_date}`,
          poster: data.results.poster_path,
        }
      }
  })

  if (filmDetails.length > 0) {
    return filmDetails
  } else {
    return {}
  }
}
