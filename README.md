# tatami
[![Build Status](https://travis-ci.org/tommykishi/tatami.svg?branch=master)](https://travis-ci.org/tommykishi/tatami)

Tatami is command line tool for making folder structure.

## Getting started

```
npm install -g tatami
```

1. Create Tatamifile
```
tatami init
```
In current directory, tatami creates Tatamifile.

2. Edit Tatamifile

3. Run tatami
```
tatami run
```

## Learn Tatamifile DSL in 30 seconds

* Tatami parses indent.
```
//This is Sample Tatami file
server/
	server.js
public/
	img/
	index.html
	dist/
		main.css
	src/
		main.scss
gulpfile.js
README.md
```

* In above case, 'tatami run' result is...
```
% tree .
.
├── README.md
├── Tatamifile
├── gulpfile.js
├── public
│   ├── dist
│   │   └── main.css
│   ├── img
│   ├── index.html
│   └── src
│       └── main.scss
└── server
    └── server.js
5 directories, 7 files
```

* In case of "Directory", after directory name, attach "/".
```
directory/ -> 'directory'
```

* When word has extension or no extension, tatami recognizes "File".
```
Makefile -> 'file'
README.md -> 'file'
```

* "Comment" is allowed only oneline comment, begin "//"
```
// This is Comment -> 'comment'
```
tatami parses by oneline, at this stage only one line comment is allowed.

## other command

parses Tatamifile, rollback before tatami run.
```
tatami rollback
```

output path to result parsing Tatamifile.
```
tatami path
```

## Lisense
MIT
