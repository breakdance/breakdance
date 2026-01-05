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
!(function($) {

  $(function() {
    // Disable empty links in docs examples
    $('.page-content [href="#"]').click(function(e) {
      e.preventDefault();
    });

    // Insert copy to clipboard button before .highlight
    $('pre > code').each(function() {
      const btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>';
      $(this).parent().before(btnHtml);
      $('.btn-clipboard').tooltip();
    });

    const clipboard = new Clipboard('.btn-clipboard', {
      target(trigger) {
        return trigger.parentNode.nextElementSibling;
      },
      text(trigger) {
        const sib = trigger.parentNode.nextElementSibling;
        const val = $(sib).text();
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
      const modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-';
      const fallbackMsg = 'Press ' + modifierKey + 'C to copy';

      $(e.trigger)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle');
    });

    // IE10 viewport hack for Surface/desktop Windows 8 bug
    //
    // See Getting Started docs for more information
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      const msViewportStyle = document.createElement('style');
      msViewportStyle.appendChild(
        document.createTextNode('@-ms-viewport{width:auto!important}')
      );
      document.querySelector('head').appendChild(msViewportStyle);
    }

    const $window = $(window);
    const $body = $(document.body);

    $body.scrollspy({
      target: '.sidebar'
    });

    $window.on('load', function() {
      $body.scrollspy('refresh');
    });

    // Keep popovers open when hovered
    $('.source-link').popover({
      trigger: 'manual',
      container: 'body',
      placement: 'left',
      toggle: 'popover',
      template: '<div class="popover popover-source"> <div class="arrow"></div> <div class="popover-inner"> <h3 class="popover-title"></h3> <div class="popover-content"> <p></p> </div> </div> </div>',
      html: true,
      delay: { show: 50, hide: 750 }
    }).on('mouseenter', function() {
      const self = this;
      $(this).popover('show');
      $(this).addClass('active');

      $('.popover').on('mouseleave', function() {
        $(self).popover('hide');
        $(self).removeClass('active');
      });

    }).on('mouseleave', function() {
      const self = this;
      setTimeout(function() {
        if (!$('.popover:hover').length) {
          $(self).popover('hide');
          $(self).removeClass('active');
        }
      }, 100);
    });

    // back to top
    setTimeout(function() {
      const $sideBar = $('.sidebar');

      $sideBar.affix({
        offset: {
          top() {
            const offsetTop = $sideBar.offset().top;
            const sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10);
            const navOuterHeight = $('.site-navigation').height() + $('.masthead').height();

            return (this.top = offsetTop - navOuterHeight - sideBarMargin);
          },
          bottom() {
            return (this.bottom = $('.site-footer').outerHeight(true));
          }
        }
      });
    }, 100);

    setTimeout(function() {
      $('.top').affix();
    }, 100);
  });

}(jQuery));
