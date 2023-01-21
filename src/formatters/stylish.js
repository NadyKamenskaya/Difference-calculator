import _ from 'lodash';

const spacesCount = 4;
const indentType = ' ';

const currentIndent = (depth) => indentType.repeat(depth * spacesCount);
const signIndent = (depth) => indentType.repeat((depth * spacesCount) - 2);
const bracketIndent = (depth) => indentType.repeat((depth * spacesCount) - 4);

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

const stylish = (diffTree) => {
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
          return `${signIndent(depth)}- ${row.name}: ${stringify(row.value1, depth + 1)}\n${signIndent(depth)}+ ${row.name}: ${stringify(row.value2, depth + 1)}`;
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

export default stylish;
