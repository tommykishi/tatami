const fs = require('fs'),
  readline = require('readline'),
  rs = fs.ReadStream('./Tatamifile'),
  rl = readline.createInterface({
    'input': rs,
    'output': {}
  }),
  parser = require('./peg.js'),
  model = require('./model.js');

const tree = new model.Tree();
const arr = [];

rl.on('line', function(line) {
  arr.push(parser.parse(line));
});

rl.on('close', function() {
  var tree = new model.Tree();
  tree.add(arr);
  //tree.getpath();
  console.log(tree.getArray());
});
