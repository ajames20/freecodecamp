(function() {

    'use strict';

    var mainContainer = document.querySelector('.main-wrap'),
        openCtrl = document.getElementById('btn-search'),
        closeCtrl = document.getElementById('btn-search-close'),
        searchContainer = document.querySelector('.search'),
        inputSearch = searchContainer.querySelector('.search__input');

    function init() {
        initEvents();
    }

    function initEvents() {
        openCtrl.addEventListener('click', openSearch);
        closeCtrl.addEventListener('click', closeSearch);
        document.addEventListener('keyup', function(ev) {
            // escape key.
            if (ev.keyCode == 27) {
                closeSearch();
            }
        });
    }

    function openSearch() {
        mainContainer.classList.add('main-wrap--move');
        searchContainer.classList.add('search--open');
        inputSearch.focus();
    }

    function closeSearch() {
        mainContainer.classList.remove('main-wrap--move');
        searchContainer.classList.remove('search--open');
        inputSearch.blur();
        inputSearch.value = '';
    }

    inputSearch.addEventListener('keyup', function(ev) {

        var userInput = document.getElementById('search-input').value,
            url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userInput + "&format=json&gsrlimit=15&generator=search&origin=*";
            console.log(url);

        fetch(url, {
            method: 'get'
        }).then(function(resp) {
            return resp.json();
        }).then(function(data) {

            var output = document.getElementById('output');
            output.innerHTML = '';
            for (var i = 0; i < data[1].length; i++) {
                output.innerHTML += "<h3 id='search-title'>" + data[1][i] + "</h3>" + '<p><a href="' + data[3][i] + '" target="_blank">' + data[3][i] + '</a></p>' + '<p>' + data[2][i] + '</p><hr/>';
            }
        }).catch(function(error) {
            // If there is any error you will catch them here
            console.log(error);
        });
        // escape key.
        if (ev.keyCode == 27 || ev.keyCode == 13) {
            closeSearch();
        }
        return false;
    });

    init();
})();
