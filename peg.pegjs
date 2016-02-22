start = grammar

grammar	= file / dir / co / file2

file = level:ws name:str "." extension:str ws
{ return {
		type: 'file',
		name: name,
		whitespace: level,
		extension: extension,
		depth: level.length
	};
}

file2 = level:ws name:str ws
{ return {
		type: 'file',
		name: name,
		whitespace: level,
		depth: level.length
	};
}

dir = level:ws name:str "/" ws
{ return {
		type: 'directory',
		name: name,
		whitespace: level,
		depth: level.length
	};
}

co = ws comment ws
{ return {
		type: 'comment'
	};
}

str "Strings"	= [A-Za-z0-9]+
ws "Whitespace"	= ws:[ \t\n\r]* { return ws; }
cstr = [A-Za-z0-9 \t\n\r]+

comment "Comment" = mComment / sComment
sComment = "//" cstr
mComment	= "/*" cstr "*/"
