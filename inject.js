// TODO: make the shortcuts editable
window.addEventListener("keydown", function(event) {
  var modifier = event.ctrlKey || event.metaKey;

  var keyMapper = [32, 37, 39];

  var valid = false;
  for (var i = 0; i < keyMapper.length; i++) {
    valid = keyMapper[i] == event.keyCode || valid;
  }

  if (modifier && event.shiftKey && valid) {
    chrome.runtime.sendMessage({
      "music_shortcut": valid,
      "music_keycode": event.keyCode
    });
  }
}, false);

chrome.runtime.onMessage.addListener (
  function (req, sender, sendResponse) {
    if (req.music_shortcut) {
      sendResponse({
        "success": musicSendPress(req.music_id)
      });
    } else {
      sendResponse({
        "player": {
          "play_pause": document.getElementById('playPause').title
        },
        "information": {
          "album_art": document.getElementById("playingAlbumArt").src,
          "song": document.getElementById("playerSongTitle").firstChild.title,
          "artist": document.getElementById("playerArtist").firstChild.title
        }
      });
    }
  }
);

function musicSendPress(id) {
  var button = document.getElementById(id);

  // We can't do anything yet
  if (!button) {
    return false;
  }

  var down = document.createEvent("MouseEvent");
  var up = document.createEvent("MouseEvent");

  down.initMouseEvent("mousedown", true, false);
  button.dispatchEvent(down);
  up.initEvent("mouseup", true, false);
  button.dispatchEvent(up);

  return true;
}
