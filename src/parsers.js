import yaml from 'js-yaml';

export default (file, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown file extension: '${fileExt}'!`);
  }
};
