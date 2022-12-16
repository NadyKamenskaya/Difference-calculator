import { resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const data1 = JSON.parse(readFileSync(resolve(cwd(), path1)));
  const data2 = JSON.parse(readFileSync(resolve(cwd(), path2)));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const objectDiff = unionKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (data1[key] === data2[key]) {
        return { ...acc, [`  ${key}`]: data1[key] };
      }

      return { ...acc, [`- ${key}`]: data1[key], [`+ ${key}`]: data2[key] };
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      return { ...acc, [`- ${key}`]: data1[key] };
    }

    return { ...acc, [`+ ${key}`]: data2[key] };
  }, {});

  const result = Object.entries(objectDiff).reduce((acc, [key, value]) => `${acc}\n  ${key}: ${value}`, '');

  return `{${result}\n}`;
};
