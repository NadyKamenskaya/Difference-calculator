import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatTree = (diffTree, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};

export default formatTree;
