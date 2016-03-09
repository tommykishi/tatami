//tatami path
const program = require('commander'),
	_ = require('lodash'),
	fs = require('fs'),
	colors = require('colors');
	parser = require('./peg/peg.js'),
	model = require('./model.js');

var arr = [];

program.parse(process.argv);

fs.stat('./Tatamifile', (err, stat) => {
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
		console.log(colors.red.bold('Tatamifile not found'));
	} else {
		console.log('Some other error: ', err.code);
	}
});

var pathlog = function(arr){
	const treeArr = new model.Tree(arr).getArray();
	_.map(treeArr, function(node, index) {
		console.log(` ${colors.cyan(index)} ${process.cwd()}${_.at(node,'path').toString()}`);
	});
};
