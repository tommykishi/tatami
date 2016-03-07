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

    this.getPath = function() {
        var patharr = [];
        _.map(arr, function(node){
            patharr.push(node.path)
        });
        return patharr;
    }

	this.plant = function(args) {
		_.each(args, function(object) {
			let node = new util.TreeNode(object);
			if (node.type != 'comment') {
				arr.push(node);
			}
		});
		this.createAst(arr.length - 1);
		return this;
	};

	this.createAst = function(c) {
		if (c < 0) {
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
            var path = [];
            var t = c;
            while(1){
                if(!arr[t].rel.get('parent')){
                  break;
                }
                var tmp = arr[t].rel.get('parent');
                path.unshift(tmp.name);
                var pindex = _.indexOf(arr, tmp);
                t -= t - pindex;
            }
            if(path.length != 0){
                arr[c].path = `/${path.join("/")}/${arr[c].name}`
            }else{
                arr[c].path = `/${arr[c].name}`
            }
            this.pather(c - 1);
		}
	};

	this.plant(nodearr).pather(arr.length -1);

};

module.exports = util;
