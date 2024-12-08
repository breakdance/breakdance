#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import { breakdance } from '..';

const argv = minimist(process.argv.slice(2));
const name = argv._[0];

const fp = path.join(process.cwd(), 'test/fixtures', name + '.html');
const str = fs.readFileSync(fp, 'utf8');

const res = breakdance(str, require('../lib/plugins/wikipedia'));
console.log(res);
