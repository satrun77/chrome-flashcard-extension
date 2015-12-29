var searchResult = '';
var searchTerm = '';

document.addEventListener('DOMContentLoaded', function () {

});

window.addEventListener('load', function (evt) {
    element('search-form').addEventListener('submit', searchCards);
    chrome.storage.local.get(['searchResult', 'searchTerm'], function (items) {
        searchResult = items.searchResult;
        searchTerm = items.searchTerm;
        element('search').value = searchTerm;
        element('cards-wrapper').innerHTML = searchResult;
    });
});

function element(id) {
    return document.getElementById(id);
}

function searchCards() {
    event.preventDefault();

    searchTerm = element('search').value;
    var searchUrl = 'https://flashcard.my.geek.nz/api/cards.html?query=' + encodeURIComponent(searchTerm);
    var cards = element('cards-wrapper');
    chrome.storage.local.set({'searchTerm': searchTerm});
    if (searchResult == '') {
        cards.innerHTML = '<p>Searching...</p>';
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'html';
    xhr.open("GET", searchUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            cards.innerHTML = xhr.responseText;
            chrome.storage.local.set({'searchResult': xhr.responseText, 'searchTerm': searchTerm});
        }
    };
    xhr.onerror = function () {
        cards.innerHTML = '<p>Search failed!</p>';
    };
    xhr.send();
}
