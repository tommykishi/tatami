//tatami path
//ok
const program = require('commander'),
	_ = require('lodash'),
	fs = require('fs'),
	readline = require('readline'),
	rs = fs.ReadStream('./Tatamifile'),
	rl = readline.createInterface({
		'input': rs,
		'output': {}
	}),
	parser = require('./peg/peg.js'),
	model = require('./model.js'),
	colors = require('colors');

var arr = [];

program.parse(process.argv);

rl.on('line', function(line) {
	arr.push(parser.parse(line));
});

rl.on('close', function() {
	const treeArr = new model.Tree(arr).getArray();
	_.map(treeArr, function(node,index){
		console.log(` ${colors.cyan.bold(index)} ${__dirname}${_.at(node,'path').toString()}`);
	});
});
