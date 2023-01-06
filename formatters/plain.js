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

const getAddedProperty = (path, value) => `Property '${path}' was added with value: ${normalizeValue(value)}`;
const getUpdatedProperty = (path, value1, value2) => `Property '${path}' was updated. From ${normalizeValue(value1)} to ${normalizeValue(value2)}`;
const getRemovedProperty = (path) => `Property '${path}' was removed`;

export default (object) => {
  const iter = (data, path = '') => {
    const entries = Object.entries(data);
    const keys = Object.keys(data);

    const result = entries
      .reduce((acc, [key, value], index) => {
        const currentKey = key.slice(2);
        const previousKey = keys[index - 1];
        const nextKey = keys[index + 1];
        const nextValue = data[nextKey];

        if (key.includes('+')) {
          if (previousKey && currentKey === previousKey.slice(2)) {
            return acc;
          }
          const newAcc = (path === '') ? `${acc}\n${getAddedProperty(currentKey, value)}`
            : `${acc}\n${getAddedProperty(`${path}.${currentKey}`, value)}`;

          return newAcc;
        }

        if (key.includes('-')) {
          if (currentKey === nextKey.slice(2)) {
            return `${acc}\n${getUpdatedProperty(`${path}.${currentKey}`, value, nextValue)}`;
          }
          const newAcc = (path === '') ? `${acc}\n${getRemovedProperty(currentKey)}`
            : `${acc}\n${getRemovedProperty(`${path}.${currentKey}`)}`;

          return newAcc;
        }

        if (typeof value === 'object') {
          const newAcc = (path === '') ? `${acc}${iter(value, key)}` : `${acc}${iter(value, `${path}.${key}`)}`;

          return newAcc;
        }

        return acc;
      }, '');

    return result;
  };

  return iter(object).trim();
};
