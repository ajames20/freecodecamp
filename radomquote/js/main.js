/* RADOM QUOTE GENERATION */
"use strict";

let newQuote = document.getElementById('request');
let tweet = document.getElementById('tweet');
const url = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";


newQuote.addEventListener('click', function() {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {

            quote.innerHTML = '<p id="quote-text"><i class="fa fa-quote-right" aria-hidden="true" </i> ' + `${data}` + ' <i class="fa fa-quote-left" aria-hidden="true"></i></p>';
            quote.innerHTML += "<p class='small-text'>Ron Swanson</p>";
        })
        .catch(function(error) {
            // If there is any error you will catch them here
            console.log(error);
        });
});




tweet.addEventListener('click', function() {
  let tweetQuote = document.getElementById("quote-text"),
      tweetText = tweetQuote.innerText;

  window.open("http://twitter.com/intent/tweet?url=" + "&text="+ '"'+ tweetText +'"' + ' Ron Swanson');


});
