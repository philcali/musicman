function updateInfos() {
  withMusicTab(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      music_information: true
    }, function(resp) {
      console.log(resp);
      var player = resp.player;

      var info = resp.information;

      var title = document.getElementById("song");
      var art = document.getElementById("album_art");
      var artist = document.getElementById("artist");

      var play = document.getElementById("playPause");

      if (play.title != player.play_pause) {
        var image = (player.play_pause == "Pause") ?
          'images/pause_button.png' :
          'images/play_button.png';

        play.title = player.play_pause;
        play.firstChild.nextSibling.src = image;
      }

      title.innerText = info.song;
      artist.innerText = info.artist;
      art.src = info.album_art;
      art.style = 'display:block';
    });
  });
}

function registerPress(kind) {
  return function() {
    withMusicTab(function (tab) {
      chrome.tabs.sendMessage(tab.id, {
        "music_shortcut": true,
        "music_id": kind
      }, function (resp) {
        updateInfos();
      });
    });
  };
}

function updateInterval() {
  updateInfos();
  setTimeout(updateInterval, 1000);
}

function register() {
  var ids = ['playPause', 'rew', 'ff'];

  for (var i = 0; i < ids.length; i ++) {
    document.querySelector("#" + ids[i]).addEventListener('click', registerPress(ids[i]));
  }

  updateInterval();
}

document.addEventListener('DOMContentLoaded', register);
