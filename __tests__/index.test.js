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
  {
    file1: 'file1.json', file2: 'file2.json', expected: readFile('expected_file_stylish.json'),
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', expected: readFile('expected_filepath_stylish.yml'),
  },
])('check file comparison in default format', ({
  file1, file2, expected,
}) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2));

  expect(actual).toEqual(expected);
});

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', expected: readFile('expected_file_stylish.json'),
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', format: 'stylish', expected: readFile('expected_filepath_stylish.yml'),
  },
])('check file comparison in stylish format', ({
  file1, file2, format, expected,
}) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);

  expect(actual).toEqual(expected);
});

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', expected: readFile('expected_file_plain.json'),
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', format: 'plain', expected: readFile('expected_filepath_plain.yml'),
  },
])('check file comparison in plain format', ({
  file1, file2, format, expected,
}) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);

  expect(actual).toEqual(expected);
});
