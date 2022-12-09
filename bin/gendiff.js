#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format');
    
program.parse();

// console.log(`${program.opts().format}`);