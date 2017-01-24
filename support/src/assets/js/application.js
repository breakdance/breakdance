// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * From Bootstrap's docs (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors
 * Copyright 2011-2017 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global Clipboard, anchors */
(function($) {
  ;'use strict'

  $(function() {
    // Disable empty links in docs examples
    $('.page-content [href="#"]').click(function(e) {
      e.preventDefault();
    });

    // Insert copy to clipboard button before .highlight
    $('pre > code').each(function() {
      var btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>';
      $(this).parent().before(btnHtml);
      $('.btn-clipboard').tooltip();
    });

    var clipboard = new Clipboard('.btn-clipboard', {
      target: function(trigger) {
        return trigger.parentNode.nextElementSibling;
      },
      text: function(trigger) {
        var sib = trigger.parentNode.nextElementSibling;
        var val = $(sib).text();
        return val.replace(/^\s*\$ +/, '');
      }
    });

    clipboard.on('success', function(e) {
      $(e.trigger)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle');

      e.clearSelection();
    });

    clipboard.on('error', function(e) {
      var modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-';
      var fallbackMsg = 'Press ' + modifierKey + 'C to copy';

      $(e.trigger)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle');
    });

  });

}(jQuery));
