'use strict';

(function() {

var input = document.getElementById("inputBar")
var button = document.getElementById("button");
var results = document.getElementById("results-container");
var playButton;
var avatar;
var artworkURL;

input.addEventListener("keypress", function(e) {
  if (e.which == 13 || e.keycode == 13) {
    var string = document.getElementById("inputBar").value;
    fetchRequest(string);
    document.getElementById("results-container").innerHTML = ""
    document.getElementById("inputBar").value = ""
  }
})

// button.onclick = function() {
//   var string = document.getElementById("inputBar").value;
//   fetchRequest(string);
//   document.getElementById("results-container").innerHTML = ""
//   document.getElementById("inputBar").value = ""
// };

function fetchRequest(string) {
  fetch ("https://api.soundcloud.com/tracks/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94&q=" + string)
  .then(
    function(response) {
      if (response.status !==200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }
        response.json().then(function(data) {
          var returnedData = data;
          insertPlay(returnedData);
      })
    })
};



function insertPlay(data) {
      for (let i=0; i < 8; i++) {
        artworkURL = data[i].artwork_url;
        if (artworkURL == null) {
          artworkURL = "images/record1.png";
        } else {
          artworkURL = `${data[i].artwork_url}`
        }
        var markup = `
          <ul class="track-box">
            <li class="album-art"><img class="avatar" src="${artworkURL}"></li>
            <li class="band-name">${data[i].user.username}</li>
            <li class="song-title">${data[i].title}</li>
            <li class="player">
              <button class="play-button" value="${data[i].stream_url}/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94"><i class="fa fa-play" aria-hidden="true"></i></button></audio>
            </li>
          </ul>
          `
        results.innerHTML += markup;
    }
    avatar = document.getElementsByClassName("avatar");
    for (let i = 0; avatar.length; i++ ) {
      if (avatar[i].src == "images/record1.png"){
        avatar[i].setAttribute("class", "placeholderAv");
    }
  }
  }
    playButton = document.getElementsByClassName("play-button");
    for (let i = 0; i < playButton.length; i++) {
      var streamURL = playButton[i].value;
      playButton[i].addEventListener("click", function(event) {
        document.getElementById("audio").setAttribute("src", streamURL)
        document.getElementById("audio").play();
    })
  }
})();
