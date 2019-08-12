'use strict';

const isEqual = require('./support/is-equal');

describe('whitespace', function() {
  it('should correctly handle whitespace', function() {
    isEqual('whitespace-td-em');

    isEqual.inline('<a href="/en-US/docs/Web/HTML/Element/base" title="The HTML &lt;base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one &lt;base> element in a document." whatever><code>&lt;base&gt;</code></a>', '[`<base>`](/en-US/docs/Web/HTML/Element/base "The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.")');

    isEqual.inline('<td style="vertical-align: top;"><a href="/" title="The HTML &lt;meta> element ... elements (&lt;base>, &lt;link>, &lt;script>, &lt;style> or &lt;title>)."><code>&lt;meta&gt;</code></a></td>', '[`<meta>`](/ "The HTML <meta> element ... elements (<base>, <link>, <script>, <style> or <title>).") |');

    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz');
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo\n_bar_ baz');
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo\n_bar_ \nbaz');

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz');
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo\n**bar** baz');
    isEqual.inline('<div>foo\n <strong>bar</strong> \nbaz</div>', 'foo\n**bar** \nbaz');

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz');
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo\nbar baz');
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo\nbar \nbaz');
  });

  it('should preserve whitespace', function() {
    const opts = { whitespace: 'pre' };
    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo\n _bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo\n _bar_ \nbaz', opts);

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo\n**bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong>\n baz</div>', 'foo\n**bar**\n baz', opts);

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo\n bar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo\n bar \nbaz', opts);
  });

  it('should normalize whitespace when enabled', function() {
    let opts = { whitespace: true };
    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo _bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo _bar_ baz', opts);

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo **bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong>\n baz</div>', 'foo **bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong> \nbaz</div>', 'foo **bar** baz', opts);

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo bar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo bar baz', opts);
  });

  it('should not normalize whitespace when disabled', function() {
    const opts = { whitespace: false };
    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo\n_bar_ baz', opts);
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo\n_bar_ \nbaz', opts);

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo\n**bar** baz', opts);
    isEqual.inline('<div>foo\n <strong>bar</strong>\n baz</div>', 'foo\n**bar**\n baz', opts);

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo\nbar baz', opts);
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo\nbar \nbaz', opts);
  });
});
