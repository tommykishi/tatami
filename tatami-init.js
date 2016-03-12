#!/usr/bin/env node
 //tatami init

'use strict'
const fs = require('fs'),
  program = require('commander'),
   helper = require('./model.js');

program.parse(process.argv);

const flag = helper.argValidate(program.args);

if (!flag.status) {
  console.log(flag.message);
  process.exit(1);
}

fs.stat('./Tatamifile', (err, stat) => {
  const data = "";

  if (err == null) {
    console.log('Tatamifile already exists');
  } else if (err.code == 'ENOENT') {
    createTatami(data);
  } else {
    console.log('Some other error: ', err.code);
  }
});

const createTatami = function(data) {
  fs.writeFile('Tatamifile', data, 'utf8', (err) => {
    if (err) throw err;
    console.log('Tatamifile created');
  });
}
