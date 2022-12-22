export default (object, replacer = ' ', spacesCount = 4) => {
  const iter = (data, newSpacesCount) => {
    const entries = Object.entries(data);
    const result = entries
      .map(([key, value]) => {
        const newKey = (key.includes('+') || key.includes('-')) ? `${replacer.repeat(newSpacesCount - 2)}${key}`.toString() : `${replacer.repeat(newSpacesCount)}${key}`.toString();
        if (value === null) {
          return `${newKey}: ${value}`;
        }
        if (typeof value === 'object') {
          return `${newKey}: {\n${iter(value, newSpacesCount + spacesCount)}\n${replacer.repeat(newSpacesCount)}}`;
        }

        return `${newKey}: ${value.toString()}`;
      });

    return `${result.join('\n')}`;
  };

  return `{\n${iter(object, spacesCount)}\n}`;
};
