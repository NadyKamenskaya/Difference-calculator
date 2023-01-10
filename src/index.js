import { extname, resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import format from '../formatters/index.js';

export const parsers = (file, fileExt) => {
  const result = (fileExt === 'json') ? JSON.parse(file) : yaml.load(file);

  return result;
};

export default (path1, path2, formatName) => {
  const getFormat = format(formatName);
  const data1 = parsers(readFileSync(resolve(cwd(), path1)), extname(path1));
  const data2 = parsers(readFileSync(resolve(cwd(), path2)), extname(path2));

  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.sortBy(_.union(keys1, keys2));

    const result = unionKeys.reduce((acc, key) => {
      if (keys1.includes(key) && keys2.includes(key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          return { ...acc, [`${key}`]: iter(obj1[key], obj2[key]) };
        }
        if (obj1[key] === obj2[key]) {
          return { ...acc, [`${key}`]: obj1[key] };
        }

        return { ...acc, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
      }
      const newAcc = (keys1.includes(key) && !keys2.includes(key))
        ? { ...acc, [`- ${key}`]: obj1[key] }
        : { ...acc, [`+ ${key}`]: obj2[key] };

      return newAcc;
    }, {});

    return result;
  };

  return getFormat(iter(data1, data2));
};
