'use strict'

const model = require('../model.js');
const parser = require('../peg.js');
const should = require('chai').should();

const fs = require('fs'),
	readline = require('readline'),
	rs = fs.ReadStream('./test/Tatamifile'),
	rl = readline.createInterface({
		'input': rs,
		'output': {}
	});

const arr = [];
var dir, file, comment, comment2;

rl.on('line', function(line) {
	arr.push(parser.parse(line));
});

rl.on('close', function() {
	dir = arr[0];
	file = arr[1];
	comment = arr[2];
	comment2 = arr[3];
});

describe('model test', () => {
	describe('treeNode', () => {
		it('dir', () => {
			let node = new model.TreeNode(dir);
		});
		it('file', () => {
			let node = new model.TreeNode(file);
		});
		it('comment', () => {
			let node = new model.TreeNode(comment);
		});
	});
	describe('Tree', () => {
		it('Tree', () => {

		});
	});



});
