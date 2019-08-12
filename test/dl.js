'use strict';

const isEqual = require('./support/is-equal');

describe('definition lists', () => {
  it('should convert definition lists', () => {
    isEqual('dl');
  });

  it('should convert indented definition lists', () => {
    isEqual('dl-indented');
  });

  it('should convert nested definition lists', () => {
    isEqual('dl-nested');
  });
});
