'use strict';

const apiKey = 'q7Gu44bcxnKu9SLzeeRui7Rc7iUXI2LWfbr1jsAt';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
 console.log('queryItems is: '+ queryItems);
}

function displayResults(responseJson, limitinput) {
  console.log(responseJson);
  $('.loading-message').addClass('hidden');
  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.data.length & i<limitinput ; i++){
    
    let address =  
   ` ${responseJson.data[i].addresses[0].line1}
    ${responseJson.data[i].addresses[0].line2}
    ${responseJson.data[i].addresses[0].line3}
    ${responseJson.data[i].addresses[0].city}, 
    ${responseJson.data[i].addresses[0].stateCode},
    ${responseJson.data[i].addresses[0].postalCode}`
  

  $('#results-list').append(
       `<li>
      <h1>${responseJson.data[i].fullName}</h1>
      <img src='${responseJson.data[i].images[0].url}' alt='${responseJson.data[i].images[0].altText}'>
     <h5>${responseJson.data[i].images[0].altText}</h5> <h6>(Credit: ${responseJson.data[i].images[0].credit})</h6>
     <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>

    <p><span class ='bold'>Description</span>: ${responseJson.data[i].description}</p> 
    <p><span class ='bold'>Address:</span> ${address} </p>
    <p><span class ='bold'>Weather: </span>${responseJson.data[i].weatherInfo}</p>
    <span class ='bold caption'>${responseJson.data[i].images[0].caption}</span>
    </li>`

  
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(stateCodeinput, limitinput=10) {
  const params = {
    stateCode: stateCodeinput,
   limit: limitinput,
   fields:'addresses,images',
    api_key:apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

   const options = {
     headers: new Headers({
       "X-Api-Key": apiKey})
  };
$('#js-error-message').html("");
$('#results-list').html("");
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, limitinput))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    
    $('.loading-message').removeClass('hidden');
    // setTimeout(function(){ $('.loading-message').removeClass('hidden'); }, 1500); 
    const stateCodeinput = $('#js-search-state').val();
    const limitinput = $('#js-results-limit').val();
    getNews(stateCodeinput, limitinput);
  });
}

$(watchForm)
