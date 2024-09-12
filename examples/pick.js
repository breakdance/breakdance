
var breakdance = require('..');
var doc = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Example document</title>
  </head>
  <body>
    <div class="main-content">
      <h1>H1 Title</h1>
      <h2>H2 Title</h2>
      <p class="lead">Some interesting info about your site!</p>
    </div>

    <hr>

    <div class="footer">
      <strong>Bold text</strong>
      <em>Italicized text</em>
      <p>This is a paragraph</p>
    </div>

    <hr>
  </body>
</html>
`;

// console.log(breakdance(doc, {omit: ['hr']}))
// console.log(breakdance(doc, {pick: ['.main-content']}))
// console.log(breakdance(doc, {pick: ['.footer']}))
console.log(breakdance(doc, {pick: ['.main-content', '.footer']}))
