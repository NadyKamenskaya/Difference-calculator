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
  const defaultFormat = genDiff(getFixturePath(file1), getFixturePath(file2));
  const stylishFormat = genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish');
  const plainFormat = genDiff(getFixturePath(file1), getFixturePath(file2), 'plain');

  expect(defaultFormat).toEqual(expectedStylish);
  expect(stylishFormat).toEqual(expectedStylish);
  expect(plainFormat).toEqual(expectedPlain);
});
