#!/usr/bin/env node
//tatami rollback

'use strict'
const program = require('commander'),
	_ = require('lodash'),
	fs = require('fs'),
	async = require('async'),
	 parser = require('./peg/peg.js'),
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
			createTree(arr);
		});

	} else if (err.code == 'ENOENT') {
		console.log('Tatamifile not found');
	} else {
		console.log('Some other error: ', err.code);
	}
});

const createTree = function(arr) {
	const treeArr = new model.Tree(arr).getArray();
	const group = _.groupBy(treeArr, 'type');
	async.waterfall([
		function(next) {
			_.map(group.file, function(node) {
				let path = `${process.cwd()}${node.path}`;
				fs.unlinkSync(path);
			});
			next();
		},
		function(next) {
			let dir = _.sortBy(group.directory, 'depth');
			_.map(_.reverse(dir), function(node) {
				let path = `${process.cwd()}${node.path}`;
				fs.rmdirSync(path);
			});
			next();
		}
	], function(err, result) {
		if (err) console.error(err);
		console.log(`${model.message(treeArr)}`);
	});
};
