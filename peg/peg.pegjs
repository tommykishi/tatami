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

file2 = level:ws name:str
{
	return {
		type: 'file',
		name: name,
		depth: level.length
	};
}

dir = level:ws name:str "/"
{
	return {
		type: 'directory',
		name: name,
		depth: level.length
	};
}

co = ws comment
{
	return {
		type: 'comment'
	};
}

str "Strings"	= $([A-Za-z0-9]+)
ws "Whitespace"	= ws:[ \t\n\r]* { return ws; }
cstr = [A-Za-z0-9 \n\r\t\v\f]+

comment "Comment" = mComment / sComment
sComment = $("//" cstr)
mComment	= $("/*" cstr "*/")

_ = (Whitespace / LineTerminator)*
  Whitespace = [\t\v\f \u00A0\uFEFF]
  LineTerminator = [\n\r\u2028\u2029]
