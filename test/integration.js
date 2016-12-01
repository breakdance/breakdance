'use strict';

var extend = require('extend-shallow');
var isEqual = require('./support/is-equal');
var plugins = require('../lib/plugins/');

describe('integration tests', function() {
  it('should convert complex html pages to test compiler coverage', function() {
    // isEqual('caniuse');
    // isEqual('mozilla-memory-management', {pick: ['#toc', '#wikiArticle']});
    isEqual('mozilla-memory-management', extend({readable: true}, plugins.mozilla));
  });

  it('should convert bootstrap HTML to markdown', function() {
    isEqual('bootstrap-reboot');
    isEqual('bootstrap-code');
  });
});
