'use strict';

var isEqual = require('./support/is-equal');

describe('table', function() {
  it('should convert table tags to markdown', function() {
    isEqual('table');
    isEqual('table-document');
  });

  it('should detect column alignment', function() {
    isEqual('table-alignment');
  });

  it('should now use row alignment', function() {
    isEqual('table-row-alignment');
  });

  it('should convert table with no thead and no tbody to markdown', function() {
    isEqual('table-no-thead-no-tbody');
  });

  it('should convert table with thead, tbody and tfoot', function() {
    isEqual('table-thead-tbody-tfoot');
  });

  it('should convert table with thead that has <th> but no <tr>', function() {
    isEqual('table-thead-no-tr');
  });

  it('should convert table with colgroup', function() {
    isEqual('table-with-colgroup');
  });

  it('should convert table with colgroup and col', function() {
    isEqual('table-with-colgroup-and-col');
  });

  it('should convert table with caption', function() {
    isEqual('table-with-caption');
  });

  it('should convert tables with multiple trs in thead', function() {
    isEqual('table-multiple-thead-tr');
    isEqual('table-multiple-thead-tr2');
  });
});
