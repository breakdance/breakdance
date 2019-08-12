'use strict';

class Position {
  constructor(loc) {
    this.index = loc.index;
    this.column = loc.column;
    this.line = loc.line;
  }
}

class Location {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  get range() {
    return [this.start.index, this.end.index];
  }
}

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

const location = state => {
  const start = new Position(state.loc);
  return token => {
    const end = new Position(state.loc);
    token.loc = new Location(start, end);
    return token;
  };
};

const format = (input, options = {}) => {
  const pos = state => new Position(state.loc);
  let ast = { type: 'root', nodes: [] };
  let bos = { type: 'bos', value: '' };
  let stack = [ast];
  let tokens = [bos];
  let state = {
    input,
    output: '',
    loc: { index: 0, column: 0, line: 0 },
    tokens
  };

  let loc = location(state);
  let prev = tokens[0] = loc(bos);
  let value;

  const updateCursor = (token = {}) => {
    if (token.type === 'newline') {
      state.loc.column = 0;
      state.loc.line++;
    } else {
      state.loc.column++;
    }
  };

  const push = token => {
    updateCursor(token);
    Reflect.defineProperty(token, 'prev', { value: prev });
    Reflect.defineProperty(prev, 'next', { value: token });
    tokens.push(loc(token));
    prev = token;
  };

  const append = (token, value, output) => {
    if (output) token.output = (token.output || '') + output;
    token.loc.end = pos(state);
    token.value += value;
    updateCursor(token);
  };

  const peek = () => input[state.loc.index + 1];
  const advance = () => input[++state.loc.index];

  for (; state.loc.index < input.length; state.loc.index++) {
    value = input[state.loc.index];
    loc = location(state);

    if (value === '\u0000') {
      push({ type: 'null', value, output: '' });
      continue;
    }

    if (value === '\u200b') {
      push({ type: 'nbsp', value, output: '' });
      continue;
    }

    if (value === '\r') {
      push({ type: 'carriage', value, output: '' });
      continue;
    }

    if (value === '\t') {
      push({ type: 'tab', value, output: '' });
      continue;
    }

    if (value === '\n') {
      if (prev.type === 'newline') {
        append(prev, value);
        continue;
      }
      push({ type: 'newline', value });
      continue;
    }

    if (value === ' ') {
      push({ type: 'space', value });
      continue;
    }

    if (value === '_') {
      push({ type: 'underscore', value });
      continue;
    }

    if (value === '*') {
      // if (prev.type === 'heading') {
      //   prev.value += value;
      //   prev.loc.end = pos(state);
      //   updateCursor();
      //   continue;
      // }

      push({ type: 'star', value });
      continue;
    }

    if (value === '#') {
      if (prev.type === 'bos' || prev.type === 'newline') {
        let token = { type: 'heading', value };

        while (peek() === '#') {
          value += advance();
          updateCursor();
        }

        push(token);

        if (peek() !== ' ') {
          prev.type = 'text';
        }
        continue;
      }

      push({ type: 'hash', value });
      continue;
    }

    if (prev.type === 'text') {
      prev.value += value;
      prev.loc.end = pos(state);
      updateCursor();
      continue;
    }

    push({ type: 'text', value });
  }

  return state;
};

// const str = `
// #\u200b This is a title

// > A blockquote\u0000\r
// >> another blockquote\r

// **A bold statement\u0000**
// - one
// - two
// - three

// `;
const str = `
#\u200b This is a title

## h2 heading
### h3 heading
#### h4 heading
####Notheading
`;

let state = format(str);
state.tokens.forEach(tok => console.log(tok));
let token = state.tokens[state.tokens.length - 6];
let lines = str.split('\n');
// console.log([str.slice(token.loc.range[0], token.loc.range[1])])
// .slice(token.loc.start.column, token.loc.end.column)
console.log([lines[token.loc.start.line]]);
console.log(token);
// format('one two three');
// console.log(state.tokens)
