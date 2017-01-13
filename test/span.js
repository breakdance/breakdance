'use strict';

var run = require('./support/run');

describe('<span>', function() {
  run([
    {
      it: 'should strip attributes',
      fixtures: [
        {
          fixture: `<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden=true></span><span class=sr-only id=inputSuccess5Status>(success)</span>`,
          expected: '(success)'
        }
      ]
    },
    {
      it: 'should retain only necessary whitespace',
      fixtures: [
        {
          fixture: `<span></span><span class=sr-only id=inputSuccess5Status> (success) </span>`,
          expected: '(success)'
        },
        {
          fixture: `<span> </span><span></span><span class=sr-only id=inputSuccess5Status> (success) </span>`,
          expected: '(success)'
        }
      ]
    },
    {
      it: 'should convert text in nested <span> tags to markdown',
      fixtures: [
        {
          fixture: `<span> </span><span>(success)</span>`,
          expected: '(success)'
        },
        {
          fixture: `
            <div class=bs-example data-example-id=form-validation-state-with-icon-without-label>
              <div class="form-group has-success has-feedback">
                <label class="sr-only control-label" for=inputSuccess5>Hidden label</label>
                <input class=form-control id=inputSuccess5 aria-describedby=inputSuccess5Status>
                <span></span><span class=sr-only id=inputSuccess5Status>(success)</span>
              </div>
            </div>`,
          expected: 'Hidden label (success)'
        }
      ]
    }
  ]);
});
