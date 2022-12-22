#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'stylish') {
      console.log(stylish(genDiff(filepath1, filepath2)));
    }
  });

program.parse(process.argv);
