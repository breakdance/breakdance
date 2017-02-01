#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ok = require('log-ok');
var mkdirp = require('mkdirp');
var breakdance = require('..');
var argv = require('yargs')
  .option('file', {
    alias: 'f',
    describe: 'HTML file to convert (with or without .html extension)',
    demand: true
  })
  .option('dest', {
    alias: 'd',
    describe: 'Destination directory. Defaults to process.cwd().',
    default: process.cwd()
  })
  .argv

fs.readFile(path.resolve(process.cwd(), argv.file), function(err, buf) {
  handleError(err);

  var str = breakdance(buf.toString(), argv);
  var name = path.basename(argv.file, path.extname(argv.file));
  var destPath = path.resolve(argv.dest, name + '.md');

  mkdirp(argv.dest, function(err) {
    handleError(err);

    fs.writeFile(destPath, str, function(err) {
      handleError(err);
      ok('Markdown file written to', destPath);
    })
  });
});

function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}
