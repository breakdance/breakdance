'use strict';

var isEqual = require('./support/is-equal');

describe('whitespace', function() {
  it('should correctly handle whitespace', function() {
    isEqual('whitespace-td-em');

    isEqual.inline('<td style="vertical-align: top;"><a href="/" title="The HTML &lt;meta> element ... elements (&lt;base>, &lt;link>, &lt;script>, &lt;style> or &lt;title>)."><code>&lt;meta&gt;</code></a></td>', '[`<meta>`](/ "The HTML <meta> element ... elements (<base>, <link>, <script>, <style> or <title>).") |');

    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz');
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo\n_bar_ baz');
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo\n_bar_ baz');

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz');
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo\n**bar** baz');
    isEqual.inline('<div>foo\n <strong>bar</strong> \nbaz</div>', 'foo\n**bar** baz');

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz');
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo\nbar baz');
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo\nbar baz');
  });

  it('should pass `normalizeWhitespace` option to cheerio', function() {
    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo _bar_ baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo _bar_ baz', {
      normalizeWhitespace: true
    });

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo **bar** baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <strong>bar</strong> \nbaz</div>', 'foo **bar** baz', {
      normalizeWhitespace: true
    });

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo bar baz', {
      normalizeWhitespace: true
    });
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo bar baz', {
      normalizeWhitespace: true
    });
  });

  it('should not normalize whitespace when disabled', function() {
    isEqual.inline('<div>foo <em>bar</em> baz</div>', 'foo _bar_ baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <em>bar</em> baz</div>', 'foo\n _bar_ baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <em>bar</em> \nbaz</div>', 'foo\n _bar_\nbaz', {
      whitespace: false
    });

    isEqual.inline('<div>foo <strong>bar</strong> baz</div>', 'foo **bar** baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <strong>bar</strong> baz</div>', 'foo\n **bar** baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <strong>bar</strong>\n baz</div>', 'foo\n **bar**\n baz', {
      whitespace: false
    });

    isEqual.inline('<div>foo <span>bar</span> baz</div>', 'foo bar baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <span>bar</span> baz</div>', 'foo\n bar baz', {
      whitespace: false
    });
    isEqual.inline('<div>foo\n <span>bar</span> \nbaz</div>', 'foo\n bar\nbaz', {
      whitespace: false
    });
  });
});
