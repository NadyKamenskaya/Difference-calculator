import _ from 'lodash';

const currentIndent = (depth) => ' '.repeat(depth * 4);
const signIndent = (depth) => ' '.repeat((depth * 4) - 2);
const bracketIndent = (depth) => ' '.repeat((depth * 4) - 4);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent(depth)}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent(depth)}}`,
  ].join('\n');
};

export default (diffTree) => {
  const iter = (tree, depth) => {
    const result = tree.map((row) => {
      switch (row.type) {
        case 'nested':
          return `${currentIndent(depth)}${row.name}: ${stringify(iter(row.value, depth + 1), depth)}`;
        case 'added':
          return `${signIndent(depth)}+ ${row.name}: ${stringify(row.value, depth + 1)}`;
        case 'deleted':
          return `${signIndent(depth)}- ${row.name}: ${stringify(row.value, depth + 1)}`;
        case 'changed':
          return `${signIndent(depth)}- ${row.name}: ${stringify(row.valueBefore, depth + 1)}\n${signIndent(depth)}+ ${row.name}: ${stringify(row.valueAfter, depth + 1)}`;
        default:
          return `${currentIndent(depth)}${row.name}: ${stringify(row.value, depth)}`;
      }
    });

    return [
      '{',
      ...result,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  };

  return iter(diffTree, 1);
};
