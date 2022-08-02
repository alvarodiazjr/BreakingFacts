var $charList = document.querySelector('.append');
var $homePage = document.querySelector('.home-page');
var $homeButton = document.querySelector('.home-button');

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad');

xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
    if (xhr.response[i].nickname === 'Holly') {
      continue;
    }
    var characters = xhr.response[i];

    var $column = document.createElement('div');
    $column.setAttribute('class', 'column-one-fifth column-half');

    var $imgBox = document.createElement('div');
    $imgBox.setAttribute('class', 'img-box');
    $column.appendChild($imgBox);

    var $img = document.createElement('img');
    $img.setAttribute('src', characters.img);
    $img.setAttribute('alt', 'character-img');
    $imgBox.appendChild($img);

    $charList.appendChild($column);
  }
  return $charList;
});

xhr.send();

$charList.addEventListener('click', function () {
  $homePage.classList.add('hidden');
  $homeButton.classList.remove('hidden');
});
