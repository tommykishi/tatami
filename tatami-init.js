//tatami init
'use strict'
const fs = require('fs'),
  program = require('commander'),
  colors = require('colors');

program.parse(process.argv);

fs.stat('./Tatamifile', (err, stat) => {
  const data =
  `src/
    index.coffee
    main.scss
dist/`;

  if (err == null) {
    console.log(colors.red.bold('Tatamifile already exists!'));
  } else if (err.code == 'ENOENT') {
    createTatami(data);
  } else {
    console.log('Some other error: ', err.code);
  }
});

const createTatami = function(data) {
  fs.writeFile('Tatamifile', data, 'utf8', (err) => {
    if (err) throw err;
    console.log(colors.red.bold('Tatamifile created!'));
  });
}
