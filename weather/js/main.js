/* RADOM QUOTE GENERATION */
"use strict";

(function() {
    let loadError = document.getElementById('error'),
        city = document.getElementById('city'),
        description = document.getElementById('description'),
        temp = document.getElementById('temp'),
        icon = document.getElementById('icon');

    const url = "http://api.wunderground.com/api/b6ad6560d07587c6/geolookup/conditions/q/autoip.json";


    fetch(url, {
            mode: 'cors'
        })
        .then((resp) => resp.json())
        .then(function(data) {
            // console.log(data);
            city.innerHTML = '<h2>' + `${data.location.city}` + '</h2>';
            temp.innerHTML = '<h3>' + `${data.current_observation.dewpoint_c}` + "<span>C</span>" + '</h3>';
            description.innerHTML = "<h4>condition: " + '<span>' + `${data.current_observation.icon}` + '</span>' + "</h4>";

            let linkIconRef = `${data.current_observation.icon}`.toString(),
                gifLink = "https://icons.wxug.com/i/c/j/" + linkIconRef + ".gif";
            icon.innerHTML = "<img src=" + gifLink + ">";
            console.log(gifLink);




            temp.addEventListener('click', function() {

                let state1 = '<h3>' + `${data.current_observation.dewpoint_c}` + "<span>C</span>" + '</h3>';
                let state2 = '<h3>' + `${data.current_observation.dewpoint_f}` + "<span>F</span>" + '</h3>';


                if (temp.innerHTML == state1) {
                    temp.innerHTML = state2;
                } else if (temp.innerHTML == state2) {
                    temp.innerHTML = state1;
                } else {
                    temp.innerHTML = state1;
                }

            });

        })
        .catch(function(error) {
            // If there is any error you will catch them here
            console.log(error);
        });
})();
