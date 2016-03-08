//tatami init
//ok
const fs = require('fs'),
	program = require('commander');

program.parse(process.argv);

fs.readFile('./TatamiSample', 'utf8', (err, data) => {
	fs.stat('./Tatamifile', (err, stat) =>{
		if(err == null) {
        console.log('Tatamifile already exists');
    } else if(err.code == 'ENOENT') {
				fs.writeFile('Tatamifile', data, 'utf8', (err) => {
					if (err) throw err;
					console.log('Tatamifile created!');
				});
    } else {
        console.log('Some other error: ', err.code);
    }
	});
});
