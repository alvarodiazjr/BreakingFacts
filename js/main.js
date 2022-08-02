var $charList = document.querySelector('.append');

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad');

xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
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

    $charList.append($column);
  }
  return $charList;
});

xhr.send();
