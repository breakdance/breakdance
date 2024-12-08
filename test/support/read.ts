import fs from 'node:fs';
import path from 'node:path';

export const read = filepath => {
  return fs.readFileSync(path.resolve(__dirname, '..', filepath), 'utf8');
};

export default read;
