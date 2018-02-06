function liveSearch() {
  let input = event.target.value

  const dataList = $('datalist#films')

  if(input.length >= 5) {
    html = [...queryFilms(input)].map(x => `<option value="${x.Title}" data-id="${x.imdbID}">`)
    dataList.html(html.join(''))
  }

  var option = dataList.find("[value='" + input + "']");

  if (option.length > 0) {
    $("#filmID").val(option.data("id"))
  }
}

function queryFilms(query) {
  query = query.replace(/\s/, "-")

  let results = []

  $.ajax({
      url: `http://www.omdbapi.com/?apikey=b33c94bf&s=${query}`,
      type: 'get',
      dataType: 'JSON',
      async: false,
      success: function(data){
        results = data.Search
      }
  })

  if (results.length > 0) {
    return results
  } else {
    return []
  }
}
