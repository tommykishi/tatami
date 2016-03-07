start = grammar

grammar	= dir / file / co / file2

file = level:ws name:$(str "." str) ws
{
	return {
		type: 'file',
		name: name,
		depth: level.length
	};
}

file2 = level:ws name:str ws
{
	return {
		type: 'file',
		name: name,
		depth: level.length
	};
}

dir = level:ws name:str "/" ws
{
	return {
		type: 'directory',
		name: name,
		depth: level.length
	};
}

co = ws comment ws
{
	return {
		type: 'comment'
	};
}

str "Strings"	= $([A-Za-z0-9]+)
ws "Whitespace"	= ws:[ \t\n\r]* { return ws; }
cstr = [A-Za-z0-9 \n\r\t\v\f]+

comment "Comment" =sComment
sComment = $("//" cstr)
