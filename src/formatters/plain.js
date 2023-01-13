const normalizeValue = (value) => {
  if (value === null) {
    return value;
  }

  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPath = (path, key) => {
  switch (path) {
    case '':
      return `${path}${key}`;
    default:
      return `${path}.${key}`;
  }
};

const getAddedProperty = (path, value) => `Property '${path}' was added with value: ${normalizeValue(value)}`;
const getUpdatedProperty = (path, value1, value2) => `Property '${path}' was updated. From ${normalizeValue(value1)} to ${normalizeValue(value2)}`;
const getRemovedProperty = (path) => `Property '${path}' was removed`;

export default (diffTree) => {
  const iter = (tree, path = '') => {
    const result = tree
      .reduce((acc, row) => {
        switch (row.type) {
          case 'nested':
            return `${acc}${iter(row.value, getPath(path, row.name))}`;
          case 'added':
            return `${acc}\n${getAddedProperty(getPath(path, row.name), row.value)}`;
          case 'deleted':
            return `${acc}\n${getRemovedProperty(getPath(path, row.name))}`;
          case 'changed':
            return `${acc}\n${getUpdatedProperty(getPath(path, row.name), row.valueBefore, row.valueAfter)}`;
          default:
            return acc;
        }
      }, '');

    return result;
  };

  return iter(diffTree).trim();
};
