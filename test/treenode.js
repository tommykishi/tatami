'use strict'

const model = require('../model.js');
const parser = require('../peg/peg.js');
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
});

describe('model test', () => {
	describe('treeNode', () => {
		it('dir', () => {
			let node = new model.TreeNode(dir);
			node.should.have.property('type', 'directory');
			node.name.should.be.string('apple');
			node.depth.should.be.eql(0);
		});
		it('file', () => {
			let node = new model.TreeNode(file);
			node.should.have.property('type', 'file');
			node.name.should.be.string('apple.txt');
			node.depth.should.be.eql(0);
		});
		it('comment', () => {
			let node = new model.TreeNode(comment);
			node.should.have.property('type', 'comment');
			node.name.should.be.empty;
			node.depth.should.be.eql(0);
		});
	});
});
