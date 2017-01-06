'use strict';

/**
 * anchorize
 */

var path = require('path');
var cheerio = require('cheerio');
var extend = require('extend-shallow');
var toc = require('markdown-toc');

module.exports = function(str, options) {
  var opts = extend({}, options);
  var tmpl = opts.template || require(path.join(__dirname, 'template.js'));
  var $ = cheerio.load(str);
  var tags = opts.tags || 'h1,h2';

  $('details ul li').each(function(i, e) {
    console.log($(e).html())
    // var href = e.attribs.href;
    // if (href.charAt(0) === '#') {
    //   li[href.slice(1)] = e;
    // }
  });

  // get all the h tags with an id
  // $(tags).each(function(i, e) {
  //   // var text = e.attribs.id || e.attribs.name || toc.slugify($(e).html());
  //   var text = $(e).html();
  //   var slug = toc.slugify(text);
  //   // var anchor = template(tmpl, {id: e.attribs.id});

  //   $(e).append(tmpl(slug));
  //   // $(this).removeAttr('id').addClass('docs-heading');
  // });

  return $.html();
};
