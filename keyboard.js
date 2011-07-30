chrome.extension.onRequest.addListener(
  function(req, sender, sendResponse) {
    if (req.music_shortcut) {
      var id = function() {
        switch (req.music_keycode) {
          case 32: return 'playPause';
          case 37: return 'rew';
          case 39: return 'ff';
        }
      }();
      console.info(id);
      withMusicTab (function(tab) {
        chrome.tabs.sendRequest(tab.id, {
          "music_shortcut": true,
          "music_id": id,
          "music_keycode": req.music_keycode
        }, function(success) {
          console.info(success);
        });
      });
    }
  }
);
