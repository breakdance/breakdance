
module.exports = {
  domain: 'http://www.xe.com/',
  text: function(node) {
    if (/<!--\s*\/\*\s*Font\s*Definitions/.test(node.val)) {
      return false;
    }
  },
  preprocess: function fn(node, prev, $) {
    if (node.name === 'html' && node.attribs) {
      if (/office:word$/.test(node.attribs['xmlns:w'])) {
        fn.isOffice = true;
      }
    }

    if (!fn.isOffice) return;

    if (node.name === 'p' && node.attribs.class === 'MsoTitle') {
      node.type = 'h1';
      var text = $('span', node).text().trim();
      if (!text) node.type = 'text';
      node.val = text;
      delete node.name;
      delete node.tag;

    } else if (/^h[1-6]/.test(node.name)) {
      node.name = node.name.replace(/^h([1-5])/, function(m, $1) {
        return 'h' + (+$1 + 1);
      });
    }
  }
};
