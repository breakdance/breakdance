'use strict';

var Time = require('time-diff');
var time = new Time();

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
    var diff = time.diff('mozilla');
    isEqual('mozilla-a');
    diff('mozilla-a');

    isEqual('mozilla-html-content-sectioning');
    diff('mozilla-html-content-sectioning');

    // isEqual('mozilla-html-demarcating-edits');
    // diff('mozilla-html-demarcating-edits');

    // isEqual('mozilla-html-document-metadata');
    // diff('mozilla-html-document-metadata');

    // isEqual('mozilla-html-embedded-content');
    // diff('mozilla-html-embedded-content');

    // isEqual('mozilla-html-forms');
    // diff('mozilla-html-forms');

    // isEqual('mozilla-html-image-and-multimedia');
    // diff('mozilla-html-image-and-multimedia');

    // isEqual('mozilla-html-inline-text-semantics');
    // diff('mozilla-html-inline-text-semantics');

    // isEqual('mozilla-html-interactive-elements');
    // diff('mozilla-html-interactive-elements');

    // isEqual('mozilla-html-main-root');
    // diff('mozilla-html-main-root');

    // isEqual('mozilla-html-obsolete-and-deprecated-elements');
    // diff('mozilla-html-obsolete-and-deprecated-elements');

    // isEqual('mozilla-html-scripting');
    // diff('mozilla-html-scripting');

    // isEqual('mozilla-html-table-content');
    // diff('mozilla-html-table-content');

    // isEqual('mozilla-html-table-td-datalist');
    // diff('mozilla-html-table-td-datalist');

    // isEqual('mozilla-html-td-a');
    // diff('mozilla-html-td-a');

    // isEqual('mozilla-html-td-datalist');
    // diff('mozilla-html-td-datalist');

    // isEqual('mozilla-html-text-content');
    // diff('mozilla-html-text-content');

    // isEqual('mozilla-html-web-components');
    // diff('mozilla-html-web-components');

    // isEqual('mozilla-table');
    // diff('mozilla-table');
  });

  // it('mozilla > full documents', function() {
  //   var diff = time.diff('mozilla:docs');
  //   isEqual('mozilla-html-elements');
  //   diff('mozilla-html-elements');

  //   isEqual('mozilla-memory-management');
  //   diff('mozilla-memory-management');

  //   isEqual('mozilla-memory-management-toc');
  //   diff('mozilla-memory-management-toc');
  // });

  // it('mozilla > readable', function() {
  //   var diff = time.diff('mozilla:docs');
  //   var opts = {readable: true};

  //   isEqual('mozilla-html-elements', 'options.readable-mozilla-html-elements', opts);
  //   diff('mozilla-html-elements');
  // });

  it('should convert bootstrap v3 HTML', function() {
    isEqual('bootstrap-css');
  });

  it('should convert bootstrap v4 HTML', function() {
    isEqual('bootstrap-code', {title: true});
    isEqual('bootstrap-reboot', {title: true});
    isEqual('bootstrap-typeography');
  });
});
