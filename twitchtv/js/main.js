/* TWITCH TV*/
"use strict";

(function() {
    var loadError = document.getElementById('error'),
        main = document.getElementById('main-content'),
        allUsersButton = document.getElementById('all-users'),
        usersOfflineButton = document.getElementById('offline'),
        usersOnlineButton = document.getElementById('online'),
        streamers = ["esl_sc2", "ogamingsc2", "bobross", "dansgaming", "cretetion", "freecodecamp", "storbeck", "habathcx", "beatpug", "RobotCaleb", "noobs2ninjas", "brunofin", "laeppastream", "terakilobyte", "Beohoff", "MedryBW"];

    for (var i = 0; i < streamers.length; i++) {
        getUserStreams(i);
    }

    function getUserStreams() {
        var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + streamers[i];

        fetch(url, {
            method: 'get'

        }).then(function(resp) {
            return resp.json();
        }).then(function(data) {

            if (data.stream !== null && data.stream !== undefined) {

                var profilePicture = data.stream.channel.logo,
                    channelLink = data._links.channel,
                    userName = data.stream.channel.name,
                    game = data.stream.game;

                main.innerHTML += '<div class="content online">' + '<h2>' + userName + '</h2>' + '<p>' + game + '</p>' + '<a href="' + channelLink + '" target="_blank">' + channelLink + '</a>' + '<img src="' + profilePicture + '">';
            } else if (data.stream === null) {
                var offChannel = data._links.channel,
                    userNameFromURL = data._links.channel.slice(38),
                    offChannelLink = data._links.self,
                    profilePicture = 'https://lh3.googleusercontent.com/Ti7DQ5NH92V-_uuOiTbMOMwAjVXzl2rubjygxQp3KGutzuRHnjYvpCtfWJybeDYh4g=w300',
                    game = '<p>Offline</p>';

                main.innerHTML += '<div class="content offline">' + '<h2>' + userNameFromURL + '</h2>' + '<p>' + game + '</p>' + '<a href="' + offChannelLink + '" target="_blank">' + offChannelLink + '</a>' + '<img src="' + profilePicture + '">';
            }
        }).catch(function(error) {
            // If there is any error you will catch them here
            loadError.innerHTML = '<h2 class="error">There was a problem fiding what you were looking for!</h2>';
        });
    }

    allUsersButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.content');
        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove('hidden');
        }
    });

    usersOnlineButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.offline'),
            elemAdd = document.querySelectorAll('.online');

        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.add('hidden');
        }
        for (var i = 0; i < elemAdd.length; i++) {
            elemAdd[i].classList.remove('hidden');
        }
    });

    usersOfflineButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.online'),
            elemAdd = document.querySelectorAll('.offline');

        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.add('hidden');
        }
        for (var i = 0; i < elemAdd.length; i++) {
            elemAdd[i].classList.remove('hidden');
        }
    });
})();
