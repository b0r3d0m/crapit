'use strict';

function saveOptions(callback) {
  const webhookUrl = $('#webhook-url').val();
  chrome.storage.sync.set({
    webhookUrl: webhookUrl
  }, function() {
    callback();
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    webhookUrl: ''
  }, function(items) {
    $('#webhook-url').val(items.webhookUrl);
  });
}

$(function() {
  restoreOptions();

  $('#options-form').submit(function() {
    saveOptions(function() {
      window.close();
    });
    return false; // Prevent default
  });
});
