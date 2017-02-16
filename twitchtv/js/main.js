/* TWITCH TV*/
"use strict";

(function() {
    var loadError = document.getElementById('error'),
        main = document.getElementById('main-content'),
        online = document.getElementById('online-user'),
        offline = document.getElementById('offline-user'),
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


                online.innerHTML += '<div class="content user-online-status ">' + '<h2>' + userName + '</h2>' + '<p>' + game + '</p>' + '<a href="' + channelLink + '" target="_blank">' + channelLink + '</a>' + '<img src="' + profilePicture + '">';

            } else if (data.stream === null) {
                var offChannel = data._links.channel,
                    userNameFromURL = data._links.channel.slice(38),
                    offChannelLink = data._links.self,
                    profilePicture = 'https://lh3.googleusercontent.com/Ti7DQ5NH92V-_uuOiTbMOMwAjVXzl2rubjygxQp3KGutzuRHnjYvpCtfWJybeDYh4g=w300',
                    game = '<p>Offline</p>',
                    url = 'https://wind-bow.gomix.me/twitch-api/channels/' + userNameFromURL;


                fetch(url, {
                    method: 'get'

                }).then(function(resp) {
                    return resp.json();
                }).then(function(data) {

                    var profilePicture = data.logo,
                        channelLink = data.url,
                        userName = data.name,
                        game = data.game;

                    if (game === null || game === undefined) {
                        game = 'No channel Information';
                    }
                    if (userName === null) {
                        name = "not found";
                    }
                    if (profilePicture === null || profilePicture === undefined) {
                        profilePicture = 'https://lh3.googleusercontent.com/Ti7DQ5NH92V-_uuOiTbMOMwAjVXzl2rubjygxQp3KGutzuRHnjYvpCtfWJybeDYh4g=w300';
                    }
                    if (data.status === 404 || data.error === "Not Found") {
                        offline.innerHTML = '<div class="content no-user ">' + '<h2>' + data.error + '</h2>' + '<p>' + data.message + '</p>' + '<a href="https://twitch.tv" target="_blank"> https://twitch.tv</a>' + '<img src="' + profilePicture + '">';
                    } else {
                        offline.innerHTML += '<div class="content user-offline-status ">' + '<h2>' + userName + '</h2>' + '<p>' + game + '</p>' + '<a href="' + channelLink + '" target="_blank">' + channelLink + '</a>' + '<img src="' + profilePicture + '">';
                    }

                }).catch(function(error) {
                    // If there is any error you will catch them here
                    loadError.innerHTML = '<h2 class="error">There was a problem fiding what you were looking for!</h2>';
                });

            }
        }).catch(function(error) {
            // If there is any error you will catch them here
            loadError.innerHTML = '<h2 class="error">There was a problem fiding what you were looking for!</h2>';
        });
    }



    allUsersButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.content'),
            elem2 = document.querySelectorAll('.user-online-status'),
            elem3 = document.querySelectorAll('.user-offline-status');

        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove('hidden');
        }
        for (var i = 0; i < elem2.length; i++) {
            elem2[i].classList.remove('online');
        }
        for (var i = 0; i < elem3.length; i++) {
            elem3[i].classList.remove('offline');
        }

    });

    usersOnlineButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.user-online-status'),
            elem2 = document.querySelectorAll('.no-user'),
            elem3 = document.querySelectorAll('.user-offline-status');

        console.log(elem);
        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.add('online');
            elem[i].classList.remove('hidden');
        }
        for (var i = 0; i < elem2.length; i++) {
            elem2[i].classList.add('hidden');
        }
        for (var i = 0; i < elem3.length; i++) {
            elem3[i].classList.add('hidden');
        }
    });

    usersOfflineButton.addEventListener('click', function() {
        var elem = document.querySelectorAll('.user-online-status'),
            elem2 = document.querySelectorAll('.no-user'),
            elem3 = document.querySelectorAll('.user-offline-status');

        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.add('hidden');
        }
        for (var i = 0; i < elem2.length; i++) {
            elem2[i].classList.add('hidden');
        }
        for (var i = 0; i < elem3.length; i++) {
            elem3[i].classList.add('offline');
            elem3[i].classList.remove('hidden');
        }
    });

})();;
