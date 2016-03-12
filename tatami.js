#! /usr/bin/env node

const program = require('commander');

program
	.version('1.0.0')
	.usage('is tool for making folder structure!')
	.command('init', "create Tatamifile")
	.command('run', "parse Tatamifile, make folder structure")
	.command('path', "output Tatamifile in path")
	.command('rollback', "roll back before tatami run");

program.parse(process.argv);
