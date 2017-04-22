#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ok = require('log-ok');
var writeFile = require('write');
var minimist = require('minimist');
var breakdance = require('..');
var pkg = require('../package');

var opts = {
  alias: {
    condense: 'c',
    domain: 'd',
    help: 'h',
    omit: 'o',
    pick: 'p',
    version: 'V'
  }
};

function help() {
  console.error('Usage: $ breakdance [options] <file> <dest>');
  console.error();
  console.error('  file:  The HTML file to convert to markdown');
  console.error('  dest:  Name of the markdown file to create. By default');
  console.error('         the HTML filename is used with a .md extension');
  console.error();
  console.error('Options:');
  console.error();
  console.error('-c, --condense', 'Collapse more than two newlines to only');
  console.error('', '              two newlines. Enabled by default');
  console.error('-d, --domain', '  Specify the root domain name to prefix onto');
  console.error('', '              "href" or "src" paths that do not star');
  console.error('-o, --omit', '    One or more tags to omit entirely from');
  console.error('', '              the HTML before converting to markdown.');
  console.error('-p, --pick', '    One or more tags to pick entirely from the');
  console.error('', '              HTML before converting to markdown.');
  console.error('--comments', '    Include HTML code comments in the generated');
  console.error('', '              markdown string. Disabled by default');
  console.error();
}

var argv = minimist(process.argv.slice(2), opts);
if (argv.version) {
  console.log('breakdance', pkg.version);
  process.exit();
}

if (argv.help) {
  help();
  process.exit();
}

var file, dest;
if (argv._[0]) {
  file = argv._[0];
  dest = argv._[1];
} else {
  file = argv.file;
  dest = argv.dest;
}

if (!file) {
  help();
  process.exit(1);
}

fs.readFile(path.resolve(process.cwd(), file), function(err, buf) {
  handleError(err);

  var destPath = dest ? path.resolve(dest) : replaceExt(file);

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

function replaceExt(fp) {
  var name = path.basename(fp, path.extname(fp));
  var dir = path.dirname(fp);
  return path.resolve(dir, name + '.md');
}
