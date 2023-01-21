import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  { file1: 'file1.json', file2: 'file2.json' },
  { file1: 'filepath1.yml', file2: 'filepath2.yml' },
])('check file comparison', ({ file1, file2 }) => {
  const expectedStylish = readFile('expected_stylish.txt');
  const expectedPlain = readFile('expected_plain.txt');

  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);

  const defaultFormat = genDiff(filePath1, filePath2);
  const stylishFormat = genDiff(filePath1, filePath2, 'stylish');
  const plainFormat = genDiff(filePath1, filePath2, 'plain');
  const jsonFormat = genDiff(filePath1, filePath2, 'json');

  expect(defaultFormat).toEqual(expectedStylish);
  expect(stylishFormat).toEqual(expectedStylish);
  expect(plainFormat).toEqual(expectedPlain);
  expect(() => JSON.parse(jsonFormat)).not.toThrow();
});
