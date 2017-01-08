'use strict';

var isEqual = require('./support/is-equal');

describe('options', function() {
  describe('stripTags', function() {
    it('should strip the given elements from HTML before converting', function() {
      isEqual('options.stripTags', 'options.stripTags', {stripTags: ['.ciu-panel-wrap'], title: true});
    });
  });
});
