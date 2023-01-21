import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.sortBy(_.union(keys1, keys2));

    const result = unionKeys.map((key) => {
      if (!_.has(obj1, key)) {
        return { name: key, type: 'added', value: obj2[key] };
      }
      if (!_.has(obj2, key)) {
        return { name: key, type: 'deleted', value: obj1[key] };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { name: key, type: 'nested', value: iter(obj1[key], obj2[key]) };
      }
      if (obj1[key] === obj2[key]) {
        return { name: key, type: 'unchanged', value: obj1[key] };
      }

      return {
        name: key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    });

    return result;
  };

  return iter(data1, data2);
};

export default buildDiffTree;
