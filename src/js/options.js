'use strict';

function saveOptions(callback) {
  const webhookUrl = $('#webhook-url').val();
  chrome.storage.local.set({
    webhookUrl: webhookUrl
  }, function() {
    callback();
  });
}

function restoreOptions() {
  chrome.storage.local.get({
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
