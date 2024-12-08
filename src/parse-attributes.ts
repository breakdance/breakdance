export const assignAttribs = (attribs, stash, value) => {
  if (!stash || !attribs) return;
  let key = stash.shift();
  if (!key) return;
  if (key.slice(-1) === '=') {
    key = key.slice(0, -1);
  } else {
    const segs = key.split('=');
    if (segs.length > 1) {
      attribs[segs[0].toLowerCase()] = segs[1];
      return;
    }
  }
  attribs[key.toLowerCase()] = value ? value.slice(1, -1) : true;
};

// eslint-disable-next-line complexity
export const parseAttributes = (input = '') => {
  if (!input || input.length > 100000) return { inner: '', match: [], index: -1, rest: input, attribs: {} };

  let match = [];
  let inner = '';
  const attribs = {};
  const stash = [''];
  let index = -1;
  let rest = '';
  let val;

  const peek = () => input[index + 1];
  const next = () => input[++index];
  const append = value => (inner += value);

  while (index < input.length) {
    const value = next();
    let finished = false;
    let quotedValue = null;
    let end = null;

    switch (value) {
      case '\\':
        append(value + (next() || ''));
        break;
      case '>':
        finished = true;
        match = [inner + value, inner];
        while (stash.length) {
          assignAttribs(attribs, stash);
        }
        index++;
        break;
      case '"':
      case '\'':
        end = value;
        quotedValue = value;

        while ((val = peek()) !== undefined && val !== end) {
          val = next();
          if (val === '\\') {
            quotedValue += val + (next() || '');
            continue;
          }
          quotedValue += val;
        }

        if (val === end) {
          quotedValue += next();
        }

        append(quotedValue);

        if (stash.length) {
          assignAttribs(attribs, stash, quotedValue);
        }
        break;
      case '=':
        if (stash.length) stash[stash.length - 1] += value;
        append(value);
        break;
      case ' ':
      case '\n':
        while (stash.length) {
          assignAttribs(attribs, stash);
        }
        stash.push('');
        append(value);
        break;
      default: {
        if (!stash.length) stash.push('');
        stash[stash.length - 1] += value;
        append(value);
        break;
      }
    }

    if (finished) {
      break;
    }
  }

  rest = input.slice(index);
  return { inner, match, index, rest, attribs };
};
