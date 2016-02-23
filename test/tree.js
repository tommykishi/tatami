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
    console.log(tree);
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
*/

describe('Tree', () => {
		it('Tree level test', () => {
            var array = tree.arr;
            let pine = array[0].rel.get('parent');
            pine.should.be.empty;
            array[1].rel.get('parent').should.have.property('name', 'pineapple');
		});
});