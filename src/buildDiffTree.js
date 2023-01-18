import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.sortBy(_.union(keys1, keys2));

    const result = unionKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (keys1.includes(key) && keys2.includes(key)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          return { name: key, type: 'nested', value: iter(value1, value2) };
        }
        if (value1 === value2) {
          return { name: key, type: 'unchanged', value: value1 };
        }

        return {
          name: key, type: 'changed', valueBefore: value1, valueAfter: value2,
        };
      }
      const newAcc = (keys1.includes(key) && !keys2.includes(key))
        ? { name: key, type: 'deleted', value: value1 }
        : { name: key, type: 'added', value: value2 };

      return newAcc;
    });

    return result;
  };

  return iter(data1, data2);
};

export default buildDiffTree;
