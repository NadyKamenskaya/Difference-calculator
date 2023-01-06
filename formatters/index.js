import plain from './plain.js';
import stylish from './stylish.js';

export default (formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain;
  }

  return stylish;
};
