function withMusicTab(doTab) {
  chrome.windows.getAll({ populate: true }, function(windows) {
    for (var j = 0; j < windows.length; j ++) {
      var tabs = windows[j].tabs;

      for (var i = 0; i < tabs.length; i ++) {
        if (tabs[i].url.match(/music.google.com/)) {
          doTab(tabs[i]);
        }
      }
    }
  });
}
