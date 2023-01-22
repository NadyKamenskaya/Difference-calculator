import yaml from 'js-yaml';

const parsers = (data, parserType) => {
  switch (parserType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: '${parserType}'!`);
  }
};

export default parsers;
