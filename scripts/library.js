function withMusicTab(doTab) {
  chrome.windows.getAll({ populate: true }, function(windows) {
    var found = false;
    for (var j = 0; j < windows.length; j ++) {
      var tabs = windows[j].tabs;

      for (var i = 0; i < tabs.length; i ++) {
        if (tabs[i].url.match(/play.google.com/)) {
          found = true;
          doTab(tabs[i]);
        }
      }
    }

    // Create the tab if it doesn't exist
    if (!found) {
      var tab = {
        url: "https://play.google.com/music/listen",
        active: true,
      };

      chrome.tabs.create(tab, doTab);
    }
  });
}
