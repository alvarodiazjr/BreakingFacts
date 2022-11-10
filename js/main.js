var $charList = document.querySelector('.append');
var $homePage = document.querySelector('.home-page');
var $homeButton = document.querySelector('.home-button');
var $fullCharInfo = document.querySelector('.full-char-info');
var $searchWrapper = document.querySelector('.search-wrapper');
var $searchInput = document.querySelector('.search-bar');
var $searchIcon = document.querySelector('.search-icon');
var $cancelSearch = document.querySelector('.cancel-icon');
var $deathButton = document.querySelector('.death-button');
var $deathInfo = document.querySelector('.death-info');
var $randomDeathDiv = document.querySelector('.random-death-button-div');
var $randomDeathButton = document.querySelector('.random-death-button');
var $quoteButton = document.querySelector('.quotes-button');
var $quoteInfo = document.querySelector('.quote-info');
var $randomQuoteDiv = document.querySelector('.random-quote-button-div');
var $randomQuoteButton = document.querySelector('.random-quote-button');
var $body = document.querySelector('body');
var $loadingCircle = document.querySelector('#loader');
var $noResults = document.querySelector('.search-error');
var $searchAgainButton = document.querySelector('.search-again-button');
var $networkError = document.querySelector('.network-error-message');
var $content = document.querySelector('.content');

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad');

xhr.responseType = 'json';

function renderCharList() {
  for (var i = 0; i < xhr.response.length; i++) {
    if (xhr.response[i].nickname === 'Holly') {
      continue;
    }
    var characters = xhr.response[i];
    data.characters.push(characters);

    var $column = document.createElement('div');
    $column.setAttribute('class', 'column-one-fifth column-half char-box');
    $column.setAttribute('char-name', characters.name + ' ' + characters.nickname);
    $column.setAttribute('number', characters.char_id);

    var $imgBox = document.createElement('div');
    $imgBox.setAttribute('class', 'img-box');
    $column.appendChild($imgBox);

    var $img = document.createElement('img');
    $img.setAttribute('class', 'characters');
    $img.setAttribute('src', characters.img);
    $img.setAttribute('alt', 'character-img');
    $img.setAttribute('id', characters.name);
    $img.setAttribute('onerror', 'this.onerror=null; this.src="images/no-image.png"');
    $imgBox.appendChild($img);

    $charList.appendChild($column);
  }
  return $charList;
}

xhr.send();

$charList.addEventListener('click', function () {
  if (event.target.tagName !== 'IMG') {
    return;
  }
  $fullCharInfo.replaceChildren();
  for (var i = 0; i < data.characters.length; i++) {
    if (data.characters[i].name === event.target.id) {
      var characters = data.characters[i];

      var $row = document.createElement('div');
      $row.setAttribute('class', 'row nowrap info-card');

      var $cardImg = document.createElement('div');
      $cardImg.setAttribute('class', 'card-img');
      $row.appendChild($cardImg);

      var $img = document.createElement('img');
      $img.setAttribute('src', characters.img);
      $img.setAttribute('alt', 'character-img');
      $img.setAttribute('onerror', 'this.onerror=null; this.src="images/no-image.png"');
      $cardImg.appendChild($img);

      var $cardText = document.createElement('div');
      $cardText.setAttribute('class', 'column-full card-text');
      $row.appendChild($cardText);

      var $name = document.createElement('h1');
      $name.textContent = characters.name;
      $cardText.appendChild($name);

      var $nickName = document.createElement('h3');
      $nickName.textContent = 'Nickname: ' + characters.nickname;
      $cardText.appendChild($nickName);

      var $birthday = document.createElement('h3');
      $birthday.textContent = 'DOB: ' + characters.birthday;
      $cardText.appendChild($birthday);

      var $occupation = document.createElement('h3');
      $occupation.textContent = 'Occupation: ' + characters.occupation;
      $cardText.appendChild($occupation);

      var $status = document.createElement('h3');
      $status.textContent = 'Status: ' + characters.status;
      $cardText.appendChild($status);

      var $actor = document.createElement('h3');
      $actor.textContent = 'Actor: ' + characters.portrayed;
      $cardText.appendChild($actor);

      $fullCharInfo.prepend($row);
    }
  }
  $quoteButton.classList.add('hidden');
  $deathButton.classList.add('hidden');
  $homePage.classList.add('hidden');
  $homeButton.classList.remove('hidden');
  $fullCharInfo.classList.remove('hidden');

  return $fullCharInfo;
});

$homeButton.addEventListener('click', function () {
  $randomDeathDiv.classList.add('hidden');
  $deathInfo.classList.add('hidden');
  $deathButton.classList.remove('hidden');
  $homePage.classList.remove('hidden');
  $homeButton.classList.add('hidden');
  $fullCharInfo.classList.add('hidden');
  $quoteButton.classList.remove('hidden');
  $quoteInfo.classList.add('hidden');
  $randomQuoteDiv.classList.add('hidden');
  $randomQuoteButton.classList.add('hidden');
});

$searchIcon.addEventListener('click', function () {
  $searchInput.focus();
});

function cancelSearch() {
  $searchInput.value = '';
  filterCharacters();
}

function filterCharacters() {
  var $charBox = document.querySelectorAll('.char-box');
  var name = $searchInput.value.toLowerCase();
  var count = 0;
  for (var x = 0; x < $charBox.length; x++) {
    var charName = [];
    charName.push($charBox[x].getAttribute('char-name'));
    for (var i = 0; i < charName.length; i++) {
      if (!charName[i].toLowerCase().includes(name)) {
        $charBox[x].classList.add('hidden');
        count++;
      } else {
        $charBox[x].classList.remove('hidden');
      }
      if (count === 56) {
        $noResults.classList.remove('hidden');
        $searchAgainButton.classList.remove('hidden');
      } else {
        $noResults.classList.add('hidden');
        $searchAgainButton.classList.add('hidden');
      }
    }
  }
}

function randomDeathInfo() {
  $deathInfo.replaceChildren();

  var deathData = new XMLHttpRequest();

  deathData.open('GET', 'https://www.breakingbadapi.com/api/random-death');

  deathData.responseType = 'json';

  deathData.addEventListener('load', function () {
    var deathInfo = deathData.response;

    var $row = document.createElement('div');
    $row.setAttribute('class', 'row nowrap info-card');

    var $cardImg = document.createElement('div');
    $cardImg.setAttribute('class', 'card-img');
    $row.appendChild($cardImg);

    var $img = document.createElement('img');
    $img.setAttribute('src', deathInfo.img);
    $img.setAttribute('onerror', 'this.onerror=null; this.src="images/no-image.png"');
    $cardImg.appendChild($img);

    var $cardText = document.createElement('div');
    $cardText.setAttribute('class', 'column-full card-text');
    $row.appendChild($cardText);

    var $name = document.createElement('h1');
    $name.textContent = deathInfo.death;
    $cardText.appendChild($name);

    var $causeOfDeath = document.createElement('h3');
    $causeOfDeath.textContent = 'Cause of Death: ' + deathInfo.cause;
    $cardText.appendChild($causeOfDeath);

    var $responsible = document.createElement('h3');
    $responsible.textContent = 'Responsible: ' + deathInfo.responsible;
    $cardText.appendChild($responsible);

    var $lastWords = document.createElement('h3');
    $lastWords.textContent = 'Last Words: ' + '"' + deathInfo.last_words + '"';
    $cardText.appendChild($lastWords);

    $deathInfo.appendChild($row);
  });

  $quoteButton.classList.add('hidden');
  $deathButton.classList.add('hidden');
  $homePage.classList.add('hidden');
  $searchWrapper.classList.add('hidden');
  $homeButton.classList.remove('hidden');
  $deathInfo.classList.remove('hidden');
  $randomDeathDiv.classList.remove('hidden');
  $randomDeathButton.classList.remove('hidden');

  deathData.send();

  return $deathInfo;
}

function randomDeathButton() {
  randomDeathInfo();
  event.preventDefault();
}

function renderQuotes() {
  $quoteInfo.replaceChildren();

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://www.breakingbadapi.com/api/quote/random');

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      var quoteData = xhr.response[i];

      var $row = document.createElement('div');
      $row.setAttribute('class', 'row info-card');

      var $quoteDiv = document.createElement('div');
      $quoteDiv.setAttribute('class', 'column-full');
      $row.appendChild($quoteDiv);

      var $quote = document.createElement('h2');
      $quote.textContent = '"' + quoteData.quote + '"';
      $quoteDiv.appendChild($quote);

      var $authorDiv = document.createElement('div');
      $authorDiv.setAttribute('class', 'column-full');
      $row.appendChild($authorDiv);

      var $author = document.createElement('h1');
      $author.textContent = '- ' + quoteData.author;
      $authorDiv.appendChild($author);

      $quoteInfo.prepend($row);
    }
  });

  $quoteButton.classList.add('hidden');
  $deathButton.classList.add('hidden');
  $homePage.classList.add('hidden');
  $searchWrapper.classList.add('hidden');
  $homeButton.classList.remove('hidden');
  $quoteInfo.classList.remove('hidden');
  $randomQuoteDiv.classList.remove('hidden');
  $randomQuoteButton.classList.remove('hidden');

  xhr.send();

  return $quoteInfo;
}

function randomQuoteButton() {
  renderQuotes();
  event.preventDefault();
}

function refreshHomePage() {
  cancelSearch();
  event.preventDefault();
}

document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    $body.style.visibility = 'hidden';
    $loadingCircle.style.visibility = 'visible';
  } else {
    $loadingCircle.style.display = 'none';
    $body.style.visibility = 'visible';
  }
};

function network(online) {
  if (online) {
    $networkError.classList.add('hidden');
    $content.classList.remove('hidden');
  } else {
    $networkError.classList.remove('hidden');
    $content.classList.add('hidden');
  }
}

window.addEventListener('load', function () {
  network(navigator.onLine);

  window.addEventListener('online', function () {
    network(true);
  });

  window.addEventListener('offline', function () {
    network(false);
  });
});

xhr.addEventListener('load', renderCharList);
$cancelSearch.addEventListener('click', cancelSearch);
$searchAgainButton.addEventListener('click', refreshHomePage);
$searchInput.addEventListener('input', filterCharacters);
$deathButton.addEventListener('click', randomDeathInfo);
$randomDeathButton.addEventListener('click', randomDeathButton);
$quoteButton.addEventListener('click', renderQuotes);
$randomQuoteButton.addEventListener('click', randomQuoteButton);
