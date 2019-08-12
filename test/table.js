'use strict';

const isEqual = require('./support/is-equal');

describe('table', () => {
  it('should convert table tags to markdown', () => {
    isEqual('table');
    isEqual('table-document');
  });

  it('should handle indentation in tables', () => isEqual('table-indented-pre'));
  it('should handle weird indentation in tables', () => isEqual('table-weird-indent'));
  it('should detect column alignment', () => isEqual('table-alignment'));
  it('should use row alignment', () => isEqual('table-row-alignment'));
  it('should convert table with colgroup', () => isEqual('table-with-colgroup'));
  it('should convert table with colgroup and col', () => isEqual('table-with-colgroup-and-col'));
  it('should convert table with caption', () => isEqual('table-with-caption'));

  it('should convert table with no thead and no tbody to markdown', () => {
    isEqual('table-no-thead-no-tbody');
  });

  it('should convert table with thead, tbody and tfoot', () => {
    isEqual('table-thead-tbody-tfoot');
  });

  it('should convert table with thead that has <th> but no <tr>', () => {
    isEqual('table-thead-no-tr');
  });

  it('should convert tables with multiple trs in thead', () => {
    isEqual('table-multiple-thead-tr');
    isEqual('table-multiple-thead-tr2');
  });
});
