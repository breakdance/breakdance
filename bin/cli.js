#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ok = require('log-ok');
var mkdirp = require('mkdirp');
var writeFile = require('write');
var breakdance = require('..');
var argv = require('yargs')
  .option('file', {
    alias: 'f',
    describe: 'HTML file to convert (with or without .html extension)'
  })
  .option('dest', {
    alias: 'd',
    describe: 'Destination directory. Defaults to process.cwd().',
    default: process.cwd()
  })
  .argv;

var file = argv.file || argv._[0];
var dest = argv.dest || argv._[1];

fs.readFile(path.resolve(process.cwd(), file), function(err, buf) {
  handleError(err);

  var name = path.basename(file, path.extname(file));
  var destPath = path.resolve(dest, name + '.md');

  writeFile(destPath, breakdance(buf.toString(), argv), function(err) {
    handleError(err);
    ok('Markdown file written to', destPath);
  });
});

function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}
