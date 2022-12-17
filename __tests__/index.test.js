import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import { parsers } from '../src/index.js';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('check json comparison', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(actual).toEqual(readFile('expected_file.json'));
});

test('check yaml comparison', () => {
  const actual = genDiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'));

  expect(actual).toEqual(readFile('expected_filepath.yml'));
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