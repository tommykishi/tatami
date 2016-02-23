'use strict'
var util = {};
const _ = require('lodash');

util.TreeNode = function(object) {
	this.type = object.type;
	this.name = object.name || [];
	this.ws = object.whitespace || [];
	this.ex = object.extension || [];
	this.depth = object.depth || 0;
	this.rel = new Map();
  if(){
  }
};

util.Tree = function() {
	this.counter = 0;
	var arr = [];
	this.add = function(args) {
		_.each(args, function(object) {
			var node = new util.TreeNode(object);
			arr.push(node);
		});
		this.scan();
	};
	this.getNode = function() {
		return arr;
	};
    this.getPath = function() {
        _.map(arr, function(node) {
            if(node.rel.get('parent')){
                console.log(`${__dirname}/${node.rel.get('parent').name.join("")}/${node.name.join("")}.${node.ex.join("")}`);
            }else{
                console.log(`${__dirname}/${node.name.join("")}`);
            }
        });
    };
	this.scan = function() {
		for (var i = 0; i < arr.length; i++) {
			for (var j = 1; j < arr.length; j++) {
				if (arr.length == i + j) break;
				if (arr[i].depth < arr[i + j].depth) {
					arr[i + j].rel.set("parent", arr[i]);
					break;
				} else if (arr[i].depth == arr[i + j].depth) {
					arr[i + j].rel.set("parent", arr[i].rel.get("parent"));
					break;
				}else if(arr[i].depth > arr[i+j].depth && arr[i].depth != arr[i-1].depth ){
					arr[i].rel.set("parent", arr[i-1]);
				} else {
					//arr[i].depth > arr[i+j].depth
					arr[i].rel.set("parent", arr[i - 1].rel.get("parent"));
					break;
				}
			}
		}
	};
};

module.exports = util;
