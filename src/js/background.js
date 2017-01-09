'use strict';

chrome.contextMenus.create({
  'title': 'Crap It!',
  'contexts': ['selection'],
  'onclick': function(info, tab) {
    // We can't just get the selected text via info.selectionText
    // because of the following bug (feature?)
    // https://bugs.chromium.org/p/chromium/issues/detail?id=116429
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function(selection) {
      // selected contains text including line breaks
      var selected = selection[0];
      // TODO: Workaround max. GET request length
      chrome.windows.create({
        url: 'src/pages/popup.html' +
             '?code=' + encodeURIComponent(selected) +
             '&url=' + encodeURIComponent(info.pageUrl) +
             '&title=' + encodeURIComponent(tab.title) +
             '&favicon=' + encodeURIComponent(tab.favIconUrl),
        type: 'popup',
        state: 'maximized'
      });
    });
  }
});
