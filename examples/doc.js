
var breakdance = require('..');
var doc = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Example document</title>
  </head>
  <body>
    <h1>H1 Title</h1>
    <h2>H2 Title</h2>
    <hr>
    <strong>Bold text</strong>
    <em>Italicized text</em>
    <p>This is a paragraph</p>
    <hr>
  </body>
</html>
`;

console.log(breakdance(doc))
