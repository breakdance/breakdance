'use strict';

var log = require('log-utils');
var cheerio = require('cheerio');
var isObject = require('isobject');
var extend = require('extend-shallow');
var utils = require('markdown-toc');

module.exports = function(file, options) {
  var opts = extend({selectors: 'h1,h2'}, options);

  if (typeof file.$ === 'undefined') {
    file.$ = cheerio.load(file.contents.toString());
  }

  var $ = file.$;

  // get all the anchor tags from inside the headers
  var headings = $(opts.selectors);
  var navigation = [];
  var slugs = {};

  function findLocation(navigation, depth) {
    if (depth === 1) {
      return navigation;
    }
    var loc = navigation[navigation.length - 1];
    if (!loc) {
      loc = {
        children: []
      };
      navigation.push(loc);
    } else if (!loc.children) {
      loc.children = [];
    }
    return findLocation(loc.children, depth - 1);
  }

  headings.map(function(i, ele) {
    var $ele = $(ele);
    var text = $ele.text().trim();
    if (!text) return;

    var slug = utils.slugify(text);
    if (slugs.hasOwnProperty(slug)) {
      slugs[slug] = slugs[slug] + 1;
      slug += '-' + slugs[slug];
    } else {
      slugs[slug] = 0;
    }

    var node = {
      text: text,
      link: slug,
      level: +ele.name.slice(1) - 1,
      $e: $ele
    };

    // var depth = node.level <= 1 ? 1 : 2;
    var location = findLocation(navigation, node.level);
    location.push(node);
  });

  /**
   * Build the HTML for side navigation.
   */

  function buildHTML(navigation, first, sParentLink) {
    return '<ul class="nav' + (first ? ' sidenav' : '') + '">' + navigation.map(function(loc) {

      if (!loc || !loc.link) return '';
      loc.link = (sParentLink ? sParentLink + '-' : '') + loc.link;
      loc.$e.attr('id', loc.link);

      return '<li><a href="#' + loc.link + '">' + loc.text + '</a>' + (loc.children ? buildHTML(loc.children, false, loc.link) : '') + '</li>';
    }).join('\n') + '</ul>';
  }

  $('#navigation').append(buildHTML(navigation, true));

  headings.map(function(i, e) {
    var $e = $(e);
    var id = $e.attr('id');

    // Anchor template
    $(this).append(anchorTemplate(id));
    if ($(this).prev().children().hasClass('source-link')) {
      var sourceLink = $(this).prev().children('.source-link');
      $(this).append(sourceLink);
    }
  });

  return $.html();
};

function anchorTemplate(id) {
  return `<a href="#${id}" name="${id}" class="anchor">
  <span class="anchor-target" id="${id}"></span>
  <span class="glyphicon glyphicon-link"></span>
</a>`;
}
