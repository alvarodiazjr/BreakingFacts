var $charList = document.querySelector('.append');
var $homePage = document.querySelector('.home-page');
var $homeButton = document.querySelector('.home-button');
var $fullCharInfo = document.querySelector('.full-char-info');
var $searchInput = document.querySelector('.search-bar');
var $searchIcon = document.querySelector('i');

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad');

xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
    if (xhr.response[i].nickname === 'Holly') {
      continue;
    }
    var characters = xhr.response[i];
    data.characters.push(characters);

    var $column = document.createElement('div');
    $column.setAttribute('class', 'column-one-fifth column-half char-box');
    $column.setAttribute('char-name', characters.name);

    var $imgBox = document.createElement('div');
    $imgBox.setAttribute('class', 'img-box');
    $column.appendChild($imgBox);

    var $img = document.createElement('img');
    $img.setAttribute('class', 'characters');
    $img.setAttribute('src', characters.img);
    $img.setAttribute('alt', 'character-img');
    $img.setAttribute('id', characters.name);
    $imgBox.appendChild($img);

    $charList.appendChild($column);
  }
  return $charList;
});

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
  $homePage.classList.add('hidden');
  $homeButton.classList.remove('hidden');
  $fullCharInfo.classList.remove('hidden');

  return $fullCharInfo;
});

$homeButton.addEventListener('click', function () {
  $homePage.classList.remove('hidden');
  $homeButton.classList.add('hidden');
  $fullCharInfo.classList.add('hidden');
});

$searchIcon.addEventListener('click', function () {
  $searchInput.focus();
});

$searchInput.addEventListener('input', function () {
  var $charBox = document.querySelectorAll('.char-box');
  var name = $searchInput.value.toLowerCase();
  for (var x = 0; x < $charBox.length; x++) {
    var charName = [];
    charName.push($charBox[x].getAttribute('char-name'));
    for (var i = 0; i < charName.length; i++) {
      if (!charName[i].toLowerCase().includes(name)) {
        $charBox[x].classList.add('hidden');
      } else {
        $charBox[x].classList.remove('hidden');
      }
    }
  }
});
