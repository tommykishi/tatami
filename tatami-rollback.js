//tatami run
'use strict'
const program = require('commander'),
	_ = require('lodash'),
	fs = require('fs'),
	readline = require('readline'),
	colors = require('colors'),
	async = require('async'),
	parser = require('./peg/peg.js'),
	model = require('./model.js');

var arr = [];

program.parse(process.argv);

fs.stat('./Tatamifile', (err, stat) => {
	if (err == null) {
		const rs = fs.ReadStream('./Tatamifile'),
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
		console.log(colors.red.bold('Tatamifile not found'));
	} else {
		console.log('Some other error: ', err.code);
	}
});

var createTree = function(arr) {
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
			_.map(group.directory, function(node) {
				let path = `${process.cwd()}${node.path}`;
				fs.rmdirSync(path);
			});
			next();
		}
	], function(err, result) {
		if (err) console.error(err);
		console.log('tatami rollback');
	});
};
