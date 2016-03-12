#!/usr/bin/env node
//tatami path

'use strict'
const program = require('commander'),
	_ = require('lodash'),
	fs = require('fs');

const parser = require('./peg/peg.js'),
	model = require('./model.js');

program.parse(process.argv);

const flag = model.argValidate(program.args);

if (!flag.status) {
	console.log(flag.message);
	process.exit(1);
}

fs.stat('./Tatamifile', (err, stat) => {
	const arr = [];

	if (err == null) {
		const readline = require('readline'),
			rs = fs.ReadStream('./Tatamifile'),
			rl = readline.createInterface({
				'input': rs,
				'output': {}
			});

		rl.on('line', function(line) {
			arr.push(parser.parse(line));
		});

		rl.on('close', function() {
			pathlog(arr);
		});

	} else if (err.code == 'ENOENT') {
		console.log('Tatamifile not found');
	} else {
		console.log('Some other error: ', err.code);
	}
});

const pathlog = function(arr) {
	const treeArr = new model.Tree(arr).getArray();
	_.map(treeArr, function(node, index) {
		console.log(` ${index+1} ${process.cwd()}${_.at(node,'path').toString()}`);
	});
	console.log(model.message(treeArr));
};
