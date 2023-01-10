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
          const newAcc = acc.push(getAddedObject(currentKey, value));

          return newAcc;
        }

        if (key.includes('-')) {
          if (nextKey && currentKey === nextKey.slice(2)) {
            const newAcc = acc.push(getUpdatedObject(currentKey, value, nextValue));

            return newAcc;
          }
          const newAcc = acc.push(getRemovedObject(currentKey, value));

          return newAcc;
        }

        if (typeof value === 'object' && value !== null) {
          const newAcc = acc.push({ name: currentKey, content: iter(value) });

          return newAcc;
        }
        const newAcc = acc.push(getNotUpdatedObject(currentKey, value));

        return newAcc;
      }, []);

    return result;
  };

  return JSON.stringify(iter(object));
};
