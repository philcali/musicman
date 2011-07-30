function withMusicTab(doTab) {
  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i ++) {
      if (tabs[i].url.match(/music.google.com/)) {
        doTab(tabs[i]);
      }
    }
  });
}
