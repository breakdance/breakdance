'use strict';

var isEqual = require('./support/is-equal');

describe('kbd', function() {
  it('should convert <kbd> tags', function() {
    isEqual.inline('To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br> To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>', 'To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>\nTo edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>');
  });
});
