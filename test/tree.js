'use strict'

//validaton する
//ファイル名重複

const model = require('../model.js');
const parser = require('../peg.js');
const should = require('chai').should();

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
	tree = new model.Tree();
	tree.add(arr);
});


describe('Tree', () => {
	/*
	0pineapple/
			1pine.txt
	2apple/
			3apple.txt
			4apple2.txt
	5apricot/
			6taste/
					7good.md
					8bad.md
					9list
						10index.html
						11main.css
	*/
	it('level test', () => {

		let treearr = tree.getArray();
		treearr[0].should.have.property('filename', 'pineapple');
		treearr[1].rel.get('parent').should.have.property('filename', 'pineapple');

		treearr[2].should.have.property('filename', 'apple');
		treearr[3].rel.get('parent').should.have.property('filename', 'apple');
		treearr[4].rel.get('parent').should.have.property('filename', 'apple');

		treearr[5].should.have.property('filename', 'apricot');
		treearr[6].rel.get('parent').should.have.property('filename', 'apricot');

		treearr[7].rel.get('parent').should.have.property('filename', 'taste');
		treearr[8].rel.get('parent').should.have.property('filename', 'taste');
		treearr[9].rel.get('parent').should.have.property('filename', 'taste');

		treearr[10].rel.get('parent').should.have.property('filename', 'list');
		treearr[11].rel.get('parent').should.have.property('filename', 'list');
	});
	it('path test', () => {
    	let treearr = tree.getPath();
	});
});
