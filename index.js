'use strict';


const apiKey = 'q7Gu44bcxnKu9SLzeeRui7Rc7iUXI2LWfbr1jsAt'

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
 console.log('queryItems is: '+ queryItems);
}



function displayResults(responseJson, limitinput) {
  console.log(responseJson);
  $('#results-list').empty();
 
  for (let i = 0; i < responseJson.data.length & i<limitinput ; i++){
    
    
    
    let address =  `${responseJson.data[i].addresses[0].line1}, 
    ${responseJson.data[i].addresses[0].line2}
    ${responseJson.data[i].addresses[0].line3}
    ${responseJson.data[i].addresses[0].city}, 
    ${responseJson.data[i].addresses[0].stateCode},
    ${responseJson.data[i].addresses[0].postalCode}`
  

  $('#results-list').append(
       `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
      <p>${responseJson.data[i].fullName}</p>
      <p>Description: ${responseJson.data[i].description}</p>
     
    <p> Address: ${address} </p>
    </li>`

    

    
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(stateCodeinput, limitinput=10) {
  const params = {
    stateCode: stateCodeinput,
   limit: limitinput,
   fields:'addresses',
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
    const stateCodeinput = $('#js-search-state').val();
    const limitinput = $('#js-results-limit').val();
    getNews(stateCodeinput, limitinput);
  });
}

$(watchForm);
