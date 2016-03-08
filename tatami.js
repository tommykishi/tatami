#! /usr/bin/env node
const program = require('commander');

program
	.version('0.0.1')
	.usage('is tool for making folder structure!')
	.command('init', "create Tatamifile")
	.command('run', "parse Tatamifile, make folder structure")
	.command('path', "output Tatamifile in path");

program.parse(process.argv);
//ok
