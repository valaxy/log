var winston = require('winston')
var getlog = require('./get-log')

require('colors')
var logger = new (winston.Logger)({
	transports: [],
	colorize  : true
})

winston.addColors({
	info : 'green',
	warn : 'yellow',
	error: 'red',
	debug: 'cyan'
})

module.exports = {
	get: function () {
		return this
	},

	openConsole: function () { // todo
		logger.add(winston.transports.Console, {
			colorize : true,
			level    : 'debug',
			showLevel: false
		})
		return this.get()
	},


	/**
	 * Log something
	 * tags:     Array<String> or String or null
	 * [indent]: Optional, Number, means indent level
	 * ...rest:  Optional, the first param of `rest` cannot be Number for conflict with `indent`
	 */
	_log: function (tags, indent) {
		var args
		if (typeof indent == 'number') {
			tags = tags ? [].concat(tags) : []
			args = [{
				tags  : tags,
				indent: indent
			}]
			args = args.concat(Array.prototype.slice.call(arguments, 2))
		} else {
			tags = tags ? [].concat(tags) : []
			args = [{
				tags  : tags,
				indent: 0
			}]
			args = args.concat(Array.prototype.slice.call(arguments, 1))
		}
		return getlog.apply(getlog, args)
	},

	info: function () {
		arguments[0] = arguments[0] ? arguments[0].green : ''
		logger.info(this._log.apply(this, arguments))
	},

	debug: function () {
		arguments[0] = arguments[0] ? arguments[0].cyan : ''
		logger.debug(this._log.apply(this, arguments))
	},

	error: function () {
		arguments[0] = arguments[0] ? arguments[0].red : ''
		logger.error(this._log.apply(this, arguments))
	},

	warn: function () {
		arguments[0] = arguments[0] ? arguments[0].yellow : ''
		logger.warn(this._log.apply(this, arguments))
	}
}