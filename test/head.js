'use strict';

var isEqual = require('./support/is-equal');

describe('head', function() {
  it('should render an empty string', function() {
    isEqual('head');
  });

  it('should render <title> when `options.title` is true', function() {
    isEqual('head-title', {title: true});
  });
});
