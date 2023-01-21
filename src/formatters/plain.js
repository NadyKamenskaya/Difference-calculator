const stringify = (value) => {
  if (value === null) {
    return String(value);
  }

  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return String(value);
  }
};

const getAddedProperty = (path, value) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`;
const getUpdatedProperty = (path, value1, value2) => `Property '${path.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
const getRemovedProperty = (path) => `Property '${path.join('.')}' was removed`;

const plain = (diffTree) => {
  const iter = (tree, path = []) => {
    const result = tree
      .reduce((acc, row) => {
        switch (row.type) {
          case 'nested':
            return `${acc}${iter(row.value, [...path, row.name])}`;
          case 'added':
            return `${acc}\n${getAddedProperty([...path, row.name], row.value)}`;
          case 'deleted':
            return `${acc}\n${getRemovedProperty([...path, row.name])}`;
          case 'changed':
            return `${acc}\n${getUpdatedProperty([...path, row.name], row.value1, row.value2)}`;
          default:
            return acc;
        }
      }, '');

    return result;
  };

  return iter(diffTree).trim();
};

export default plain;
