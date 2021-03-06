'use strict'

const model = require('../model.js'),
	parser = require('../peg/peg.js'),
	should = require('chai').should();

const fs = require('fs'),
	readline = require('readline'),
	rs = fs.ReadStream('./test/Tatamifile2'),
	rl = readline.createInterface({
		'input': rs,
		'output': {}
	});

const arr = [];

var tree;

rl.on('line', function(line) {
	arr.push(parser.parse(line));
});

rl.on('close', function() {
	tree = new model.Tree(arr);
});

/*
pineapple/
    pine.txt
apple/
    apple.txt
    apple2.txt
apricot/
    taste/
        good.md
        bad.md
        list
          index.html
          main.css
*/

describe('Tree', () => {
	it('level test', () => {
		let treearr = tree.getArray();
		treearr[0].should.have.property('name', 'pineapple');
		treearr[1].rel.get('parent').should.be.eql(treearr[0]);
		treearr[2].should.have.property('name', 'apple');
		treearr[3].rel.get('parent').should.be.eql(treearr[2]);
		treearr[4].rel.get('parent').should.be.eql(treearr[2]);
		treearr[5].should.have.property('name', 'apricot');
		treearr[6].rel.get('parent').should.be.eql(treearr[5]);
		treearr[7].rel.get('parent').should.be.eql(treearr[6]);
		treearr[8].rel.get('parent').should.be.eql(treearr[6]);
		treearr[9].rel.get('parent').should.be.eql(treearr[6]);
		treearr[10].rel.get('parent').should.be.eql(treearr[9]);
		treearr[11].rel.get('parent').should.be.eql(treearr[9]);
	});

	it('path test', () => {
		let patharr = tree.getPath();
		patharr[0].should.be.string('/pineapple/');
		patharr[1].should.be.string('/pineapple/pine.txt');
		patharr[2].should.be.string('/apple/');
		patharr[3].should.be.string('/apple/apple.txt');
		patharr[4].should.be.string('/apple/apple2.txt');
		patharr[5].should.be.string('/apricot/');
		patharr[6].should.be.string('/apricot/taste/');
		patharr[7].should.be.string('/apricot/taste/good.md');
		patharr[8].should.be.string('/apricot/taste/bad.md');
		patharr[9].should.be.string('/apricot/taste/list');
		patharr[10].should.be.string('/apricot/taste/list/index.html');
		patharr[11].should.be.string('/apricot/taste/list/main.css');
	});
});
