'use strict';

var extend = require('extend-shallow');
var isEqual = require('./support/is-equal');
var configs = require('../lib/configs/');

describe('integration tests (testing random complex HTML for coverage)', function() {
  this.timeout(20000);

  it('should use canonical link in <img> src in wikipedia HTML', function() {
    var opts = extend({reflinks: false}, configs.wikipedia);
    isEqual('wikipedia-img-src', opts);
  });

  it('should convert caniuse HTML', function() {
    isEqual('caniuse-li-p');
    isEqual('caniuse', {title: true});
  });

  it.only('should convert mozilla docs HTML', function() {
    isEqual('mozilla-a');
    isEqual('mozilla-html-td-a');
    isEqual('mozilla-html-td-datalist');
    isEqual('mozilla-html-table-td-datalist');
    isEqual('mozilla-table');
    isEqual('mozilla-memory-management-toc');
    isEqual('mozilla-memory-management');
    isEqual('mozilla-html-elements');
    isEqual('mozilla-html-elements', 'options.readable-mozilla-html-elements', {readable: true});
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
