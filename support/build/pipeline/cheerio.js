
const through = require('through2');
const cheerio = require('cheerio');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    file.$ = cheerio.load(file.contents.toString(), options);
    next(null, file);
  });
};

