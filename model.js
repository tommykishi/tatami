'use strict'

var util = {};
const _ = require('lodash');


util.TreeNode = function(object) {
	this.type = object.type;
	this.name = object.name || [];
	this.depth = object.depth || 0;
	this.rel = new Map();
};

util.Tree = function(nodearr) {
	var arr = [];

	this.getArray = function() {
		return arr;
	};

	this.plant = function(args) {
		_.each(args, function(object) {
			let node = new util.TreeNode(object);
			arr.push(node);
		});
		return this;
	};

	this.createAst = function(c) {
		if (c < 0) {
            this.pather(c);
            return this;
		} else if (arr[c].depth == 0) {
			this.createAst(c - 1);
		} else {
			var i = 1;
			while (1) {
				if ((c - i) < 0) break;
				if (arr[c].depth > arr[c - i].depth) break;
				i++;
			}
			arr[c].rel.set("parent", arr[c - i]);
			this.createAst(c - 1);
		}
	};

	this.pather = function(c) {
		var path = [];
		if (c < 0) {
			return;
		} else {
			arr[c].path = `${__dirname}/${arr[c].name}`
			this.pather(c - 1);
		}
	};

	this.plant(nodearr).createAst(arr.length - 1);
};

module.exports = util;
