'use strict';

var Time = require('time-diff');
var time = new Time();

var extend = require('extend-shallow');
var isEqual = require('./support/is-equal');
var configs = require('./configs/');

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

  it('should convert mozilla docs HTML', function() {
    var diff = time.diff('mozilla');

    isEqual.inline(`<table><td><a href="/en-US/docs/Web/HTML/Element/nav" title="The HTML &lt;nav&gt; element (HTML Navigation Element) represents a section of a page that links to other pages or to parts within the page: a section with navigation links."><code>&lt;nav&gt;</code></a></td>
   <td>The <strong>HTML <code>&lt;nav&gt;</code> element</strong> (<em>HTML Navigation Element</em>) represents a section of a page that links to other pages or to parts within the page: a section with navigation links.</td>`, '[`<nav>`](/en-US/docs/Web/HTML/Element/nav "The HTML <nav> element (HTML Navigation Element) represents a section of a page that links to other pages or to parts within the page: a section with navigation links.") | The **HTML `<nav>` element** (_HTML Navigation Element_) represents a section of a page that links to other pages or to parts within the page: a section with navigation links. |');

    isEqual('mozilla-a');
    diff('mozilla-a');

    isEqual('mozilla-html-content-sectioning-address');
    diff('mozilla-html-content-sectioning-address');

    isEqual('mozilla-html-content-sectioning');
    diff('mozilla-html-content-sectioning');

    isEqual('mozilla-html-demarcating-edits');
    diff('mozilla-html-demarcating-edits');

    isEqual('mozilla-html-document-metadata');
    diff('mozilla-html-document-metadata');

    isEqual('mozilla-html-embedded-content');
    diff('mozilla-html-embedded-content');

    isEqual('mozilla-html-forms-button');
    diff('mozilla-html-forms-button');

    isEqual('mozilla-html-forms');
    diff('mozilla-html-forms');

    isEqual('mozilla-html-image-and-multimedia');
    diff('mozilla-html-image-and-multimedia');

    isEqual('mozilla-html-inline-text-semantics-br');
    diff('mozilla-html-inline-text-semantics-br');

    isEqual('mozilla-html-inline-text-semantics');
    diff('mozilla-html-inline-text-semantics');

    isEqual('mozilla-html-interactive-elements');
    diff('mozilla-html-interactive-elements');

    isEqual('mozilla-html-main-root');
    diff('mozilla-html-main-root');

    isEqual('mozilla-html-obsolete-and-deprecated-elements');
    diff('mozilla-html-obsolete-and-deprecated-elements');

    isEqual('mozilla-html-scripting');
    diff('mozilla-html-scripting');

    isEqual('mozilla-html-table-content');
    diff('mozilla-html-table-content');

    isEqual('mozilla-html-table-td-datalist');
    diff('mozilla-html-table-td-datalist');

    isEqual('mozilla-html-td-a');
    diff('mozilla-html-td-a');

    isEqual('mozilla-html-td-datalist');
    diff('mozilla-html-td-datalist');

    isEqual('mozilla-html-text-content');
    diff('mozilla-html-text-content');

    isEqual('mozilla-html-web-components');
    diff('mozilla-html-web-components');

    isEqual('mozilla-table');
    diff('mozilla-table');
  });

  it('mozilla > full documents', function() {
    var diff = time.diff('mozilla:docs');
    isEqual('mozilla-html-elements-attributes', {domain: 'https://developer.mozilla.org'});
    diff('mozilla-html-elements-attributes');

    isEqual('mozilla-html-elements', {domain: 'https://developer.mozilla.org'});
    diff('mozilla-html-elements');

    isEqual('mozilla-memory-management', {domain: 'https://developer.mozilla.org'});
    diff('mozilla-memory-management');

    isEqual('mozilla-memory-management-toc', {domain: 'https://developer.mozilla.org'});
    diff('mozilla-memory-management-toc');
  });

  it('should convert bootstrap v3 HTML', function() {
    isEqual.inline('<h4>Demo <code>:focus</code> state</h4> <p>The above example input uses custom styles in our documentation to demonstrate the <code>:focus</code> state on a <code>.form-control</code>.</p>', '#### Demo `:focus` state\n\nThe above example input uses custom styles in our documentation to demonstrate the `:focus` state on a `.form-control`.');
    isEqual.inline('<p>See the example below for a better idea of how it all works.</p> <div class="row show-grid"> <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div> <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div> </div> <div class="row show-grid"> <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div> <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div> <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div> </div> <div class="row show-grid"> <div class=col-xs-6>.col-xs-6</div> <div class=col-xs-6>.col-xs-6</div> </div>', 'See the example below for a better idea of how it all works.\n.col-xs-12 .col-md-8 .col-xs-6 .col-md-4 .col-xs-6 .col-md-4 .col-xs-6 .col-md-4 .col-xs-6 .col-md-4 .col-xs-6 .col-xs-6');
    isEqual('bootstrap-css-checkmarks');
    isEqual('bootstrap-css-table');
    isEqual('bootstrap-css');
  });

  it('should convert bootstrap v4 HTML', function() {
    isEqual('bootstrap-code', {title: true});
    isEqual('bootstrap-reboot-address');
    isEqual('bootstrap-reboot', {title: true});
    isEqual('bootstrap-typeography');
  });
});
