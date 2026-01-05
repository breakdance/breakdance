
const toc = require('markdown-toc');
const through = require('through2');

/**
 * This file is not used at the moment
 */

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    const str = anchors(file.contents.toString());
    file.contents = new Buffer(toc.insert(str, options));
    next(null, file);
  });
};

function anchors(str) {
  const slugs = {};
  return str.replace(/^#{1,4} ([^\n]+)/gm, function(m, $1) {
    let slug = toc.slugify($1);
    if (slugs.hasOwnProperty(slug)) {
      slugs[slug] = slugs[slug] + 1;
      slug += '-' + slugs[slug];
    } else {
      slugs[slug] = 0;
    }
    return anchor(slug) + m;
  });
}

function anchor(id) {
  return `<a href="#${id}" name="${id}" aria-hidden="true"></a>\n`;
}
