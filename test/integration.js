'use strict';

var extend = require('extend-shallow');
var isEqual = require('./support/is-equal');
var plugins = require('../lib/plugins/');

describe('integration tests (testing random complex HTML for coverage)', function() {
  this.timeout(20000);

  it('should convert caniuse HTML', function() {
    isEqual('caniuse-li-p');
    isEqual('caniuse', {title: true});
  });

  it('should convert mozilla docs HTML', function() {
    isEqual('mozilla-memory-management', extend({readable: true, title: true}, plugins.mozilla));
    isEqual('mozilla-html-elements', extend({readable: true, title: true}, plugins.mozilla));
  });

  it('should convert bootstrap v3 HTML', function() {
    isEqual('bootstrap-css');
  });

  it('should convert bootstrap v4 HTML', function() {
    isEqual('bootstrap-code', {title: true});
    isEqual('bootstrap-reboot', {title: true});
    isEqual('bootstrap-typeography');
  });
});
