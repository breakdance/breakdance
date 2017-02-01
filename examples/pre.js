var Breakdance = require('..');
var breakdance = new Breakdance();

breakdance
  .set('pre', function(node) {
    // console.log(node)
    // <pre> has open and close tags, so `node` will have a `node.nodes`
    // array with "child" nodes. We need to iterate over those child nodes
    // to output the inner contents of the pre tag
    this.mapVisit(node);
  })
  .set('pre.open', function(node) {
    this.emit('```\n');
  })
  .set('pre.close', function(node) {
    this.emit('\n```');
  })

  // we don't want to override the text node just for <pre> tags
  // since that would change how text is output for everything,
  // so instead we will register a "before" handler, so we can modify
  // the text output before anything else
  .before('text', function(node) {
    if (this.isInside(node, 'pre')) {
      // do stuff to inner contents of `<pre>` tag,
      // and don't "emit" the string here, since
      // that will already be done by the "text" handler
      node.val = node.val.replace(/^var /g, 'const ');
    }
  })

var ast = breakdance.parse('<div><pre>var foo = "bar";</pre></div>');
var str = breakdance.compile(ast).output;
console.log(str);
// ```
// const foo = "bar";
// ```
