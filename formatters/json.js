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
          acc.push(getAddedObject(currentKey, value));

          return acc;
        }

        if (key.includes('-')) {
          if (nextKey && currentKey === nextKey.slice(2)) {
            acc.push(getUpdatedObject(currentKey, value, nextValue));

            return acc;
          }
          acc.push(getRemovedObject(currentKey, value));

          return acc;
        }

        if (typeof value === 'object' && value !== null) {
          acc.push({ name: currentKey, content: iter(value) });

          return acc;
        }
        acc.push(getNotUpdatedObject(currentKey, value));

        return acc;
      }, []);

    return result;
  };

  return JSON.stringify(iter(object));
};
