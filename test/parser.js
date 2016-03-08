'use strict'

const parser = require('../peg/peg.js');
const should = require('chai').should();

describe('Pegjs parser test', () => {
	describe('if file be parsed corrctly ', () => {
		it('general file', () => {
			parser.parse('apple.md').should.have.property('type', 'file');
		});
		it('file name including number', () => {
			parser.parse('111.md').should.have.property('type', 'file');
		});
		it('file name including non alphabets', () => {
			//parser.parse('りんご.md').should.have.property('type', 'file');
		});
		it('file name including uppercase letter', () => {
			parser.parse('Apple.md').should.have.property('type', 'file');
		});
		it('file without extension', () => {
    	parser.parse('Apple').should.have.property('type', 'file');
		});
	});
	describe('if directory be parsed correctly', () => {
		it('general dir', () => {
			parser.parse('apple/').should.have.property('type', 'directory');
		});
		it('dir including number', () => {
			parser.parse('111/').should.have.property('type', 'directory');
		});
		it('dir including non alphabets', () => {
			//parser.parse('りんご/').should.have.property('type', 'directory');
		});
		it('dir including uppercase letter', () => {
			parser.parse('Apple/').should.have.property('type', 'directory');
		});
	});
	describe('if comment be parsed correctly', () => {
		it('single comment', () => {
			parser.parse('//  singlecomment').should.have.property('type', 'comment');
		});
		it('multiline comment', () => {
			//parser.parse('/*multilinecomment*/').should.have.property('type', 'comment');
		});
		it('comment including number', () => {
			parser.parse('//single111').should.have.property('type', 'comment');
			//parser.parse('/*multiline111*/').should.have.property('type', 'comment');
		});
		it('comment including uppercase letter', () => {
			parser.parse('//SingleComment').should.have.property('type', 'comment');
			//parser.parse('/*MultilineComment*/').should.have.property('type', 'comment');
		});
		it('comment including white space', () => {
			parser.parse('//single  comment').should.have.property('type', 'comment');
			//parser.parse('/*multiline  comment*/').should.have.property('type', 'comment');
		});
		it('comment including non alphabets', () => {
			//parser.parse('//コメント').should.have.property('type', 'comment');
			//parser.parse('/*コメント*/').should.have.property('type', 'comment');
		});
	});
	describe('common test', () => {
		it('incorrect input', () => {
			(function(){parser.parse('app le.md')}).should.throw();
			(function(){parser.parse('apple.m d')}).should.throw();
			(function(){parser.parse('app/le.md')}).should.throw();
			(function(){parser.parse('app?le.md')}).should.throw();
			(function(){parser.parse('app*le.md')}).should.throw();
			(function(){parser.parse('app:le.md')}).should.throw();
			(function(){parser.parse('app|le.md')}).should.throw();
			(function(){parser.parse('app<le.md')}).should.throw();
			(function(){parser.parse('app>le.md')}).should.throw();
		});
	});
});
