$(function() {

  // Initalize the ToC if we're on an article page
  var $list = $('.js-toc');

  if ($list.length) {
    tableOfContents($list);

    var tocOffset = $list.offset().top;
    var tocSections = $('.toc-item');

    var tocSectionOffsets = [];
    var tocPadding = 20;
    var scrolled = false;

    // Calculates the toc section offsets, which can change as images get loaded
    var calculateTocSections = function() {
      tocSectionOffsets = [];
      tocSections.each(function(i, section) {
        tocSectionOffsets.push(section.offsetTop);
      });
    };

    calculateTocSections();
    $(window).bind('load', calculateTocSections);

    var highlightTocSection = function() {
      var highlightIndex = 0;
      $.each(tocSectionOffsets, function(i, offset) {
        if (window.scrollY > offset) {
          highlightIndex = i;
        }
      });
      highlightIndex += 1;
      $('ol.toc .active').removeClass('active');
      $('ol.toc li:nth-child(' + highlightIndex + ') a').addClass('active');
    };

    highlightTocSection();

    $(window).scroll(function() {
      scrolled = true;
    });

    setInterval(function() {
      if (scrolled) {
        scrolled = false;

        if (window.scrollY > tocOffset - tocPadding) {
          $list.addClass('sticky');
        } else {
          $list.removeClass('sticky');
        }
      }

      highlightTocSection();
    }, 100);

    // var exampleNav = $('.js-examples-nav');
    // if (exampleNav.length) {
    //   exampleNav.on('click', 'a', function(event) {
    //     event.preventDefault();
    //     exampleNav.find('a').removeClass('selected');
    //     $('.markdown-example').hide();
    //     $('#' + $(this).attr('data-container-id')).show();
    //     $(this).addClass('selected');
    //   });
    // }
  }
});

// Generate the table of contents based on a.toc-item elements
// throughout the page, and follow along via scroll.
var tableOfContents = function($list) {
  if ($list.length === 0) return;

  $('.toc-item').each(function(i, chapterAnchor) {
    var $chapterAnchor = $(chapterAnchor);
    var listLink = $('<a>')
      .attr('href', '#' + $chapterAnchor.attr('id'))
      .text($chapterAnchor.attr('title'))
      // .bind('click', scrollTo);

    var listItem = $('<li>').append(listLink);

    $list.append(listItem);
  });
};

var scrollTo = function(e) {
  e.preventDefault();

  var elScrollTo = $(e.target).attr('href');
  console.log(elScrollTo)
  var $el = $(elScrollTo);

  $('body,html').animate({
    scrollTop: $el.offset().top
  }, 200, 'swing', function() {
    location.hash = elScrollTo;
  });
};
