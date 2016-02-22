const fs = require('fs'),
	  readline = require('readline'),
	  rs = fs.ReadStream('./Antfile'),
	  rl = readline.createInterface({
	    'input': rs,
		'output': {}
	  });

const parser = require('./peg.js');
const model = require('./model.js');

const tree = new model.Tree();
const arr = [];

rl.on('line', function(line) {
	arr.push(parser.parse(line));
});

rl.on('close', function() {
	var tree = new model.Tree();
	tree.add(arr);
	tree.getPath();
});
