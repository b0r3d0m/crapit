'use strict';

// From http://stackoverflow.com/a/901144
function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  alertify.parent(document.body); // https://github.com/alertifyjs/alertify.js/issues/101

  $('.image-picker').imagepicker();

  const codeMirror = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true
  });
  codeMirror.setValue(getParameterByName('code'));

  const url = getParameterByName('url');
  $('<a />', {
    'class': 'form-control-static',
    href: url,
    text: getParameterByName('title')
  }).appendTo('#url-container');

  $('#cr-form').submit(function() {
    chrome.storage.local.get({
      webhookUrl: ''
    }, function(items) {
      const selectedEmoji = $('.image-picker').data('picker').selected_values()[0];
      $.post(items.webhookUrl, {
        payload: JSON.stringify({
          text: '```' + codeMirror.getValue() + '```\n\n' + $('#comment').val(),
          username: 'Crap It!',
          icon_emoji: selectedEmoji,
          attachments: [{
            fallback: url,
            color: '#36a64f', // Some sort of a green color
            title: getParameterByName('title'),
            title_link: url,
            text: 'Click the above link to view the full version of the code',
            thumb_url: getParameterByName('favicon')
          }]
        })
      }).done(function() {
        alertify.success('\u2713 Success'); // check mark
      }).fail(function() {
        alertify.error('\u2639 Error. Please double-check the options'); // frowning face
      });
    });
    return false; // Prevent default
  });
});
