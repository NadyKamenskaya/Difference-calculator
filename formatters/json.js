const getAddedObject = (key, value) => ({ name: key, status: 'added', content: value });
const getUpdatedObject = (key, currentValue, nextValue) => ({
  name: key, status: 'updated', content_before: currentValue, content_after: nextValue,
});
const getNotUpdatedObject = (key, value) => ({ name: key, status: 'not updated', content: value });
const getRemovedObject = (key, value) => ({ name: key, status: 'removed', content: value });

export default (object) => {
  const iter = (data) => {
    const entries = Object.entries(data);
    const keys = Object.keys(data);

    const result = entries
      .reduce((acc, [key, value], index) => {
        const currentKey = (key.includes('+') || key.includes('-')) ? key.slice(2) : key;
        const previousKey = keys[index - 1];
        const nextKey = keys[index + 1];
        const nextValue = data[nextKey];

        if (key.includes('+')) {
          if (previousKey && currentKey === previousKey.slice(2)) {
            return acc;
          }

          return [...acc, getAddedObject(currentKey, value)];
        }

        if (key.includes('-')) {
          if (nextKey && currentKey === nextKey.slice(2)) {
            return [...acc, getUpdatedObject(currentKey, value, nextValue)];
          }

          return [...acc, getRemovedObject(currentKey, value)];
        }

        if (typeof value === 'object' && value !== null) {
          return [...acc, { name: currentKey, content: iter(value) }];
        }

        return [...acc, getNotUpdatedObject(currentKey, value)];
      }, []);

    return result;
  };

  return JSON.stringify(iter(object));
};
