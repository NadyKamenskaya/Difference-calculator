import { extname, resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import parsers from './src/parsers.js';
import buildDiffTree from './src/buildDiffTree.js';
import format from './src/formatters/index.js';

export default (path1, path2, formatName) => {
  const getFormat = format(formatName);
  const file1 = readFileSync(resolve(cwd(), path1));
  const file2 = readFileSync(resolve(cwd(), path2));
  const extFile1 = extname(path1);
  const extFile2 = extname(path2);
  const dataFile1 = parsers(file1, extFile1);
  const dataFile2 = parsers(file2, extFile2);

  return getFormat(buildDiffTree(dataFile1, dataFile2));
};
