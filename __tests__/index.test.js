import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import genDiff, { parsers } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('check json comparison stylish', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');

  expect(actual).toEqual(readFile('expected_file_stylish.json'));
});

test('check yaml comparison stylish', () => {
  const actual = genDiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'), 'stylish');

  expect(actual).toEqual(readFile('expected_filepath_stylish.yml'));
});

test('check json comparison plain', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');

  expect(actual).toEqual(readFile('expected_file_plain.json'));
});

test('check yaml comparison plain', () => {
  const actual = genDiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'), 'plain');

  expect(actual).toEqual(readFile('expected_filepath_plain.yml'));
});

test('parsers json', () => {
  const actual = parsers(readFile('file1.json'), 'json');
  const expected = JSON.parse(readFile('file1.json'));

  expect(actual).toEqual(expected);
});

test('parsers yaml', () => {
  const actual = parsers(readFile('filepath1.yml'), 'yml');
  const expected = yaml.load(readFile('filepath1.yml'));

  expect(actual).toEqual(expected);
});
