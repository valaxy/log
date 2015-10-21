var util = require('util')
var singleIndent


var getlog = function (options) {
	options = options || {}
	var indent = Number(options.indent) || 0
	var level = (options.level === undefined || options.level === null) ? null : String(options.level)
	var tags = options.tags || []


	// add level tag
	var strBuild = []
	if (level) {
		strBuild.push(level)
	}

	// add tags
	strBuild = strBuild.concat(tags)


	// get msg
	// @ÈÕÖ¾: Boolean([]) == true
	var args = Array.prototype.splice.call(arguments, 1)
	var msg = (strBuild.length > 0 ? strBuild.join(' ') + ' ' : '') + util.format.apply(util, args)


	// indent msg
	if (indent > 0) {
		var lines = msg.split('\n')
		var indentStr = new Array(indent + 1).join(singleIndent)
		for (var i = 0; i < lines.length; i++) {
			lines[i] = indentStr + lines[i]
		}
		msg = lines.join('\n')
	}

	return msg
}

getlog.config = function (options) {
	options = options || {}
	var indentSpaceCount = options.indentSpaceCount || 4
	singleIndent = new Array(indentSpaceCount + 1).join(' ')
}

getlog.config()

module.exports = getlog