const winston = require('winston')
const getlog = require('./get-log')
const moment = require('moment')

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
	hasOpenConsole: false,
	hasTimestamp  : false,

	get() {
		return this
	},

	openConsole() {
		if (!this.hasOpenConsole) {
			logger.add(winston.transports.Console, {
				colorize : true,
				level    : 'debug',
				showLevel: false
			})
			this.hasOpenConsole = true
		}
		return this.get()
	},

	openTimestamp() {
		this.hasTimestamp = true
		return this.get()
	},

	/**
	 * Log something
	 * tags:     Array<String> or String or null
	 * [indent]: Optional, Number, means indent level
	 * ...rest:  Optional, the first param of `rest` cannot be Number for conflict with `indent`
	 */
	_log: function (tags, indent) {
		let args
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
		if (this.hasTimestamp) {
			tags.splice(0, 0, `[${moment().format('HH:mm:ss')}]`) // todo, 时间戳加颜色
		}

		return getlog.apply(getlog, args)
	},

	info() {
		if (Array.isArray(arguments[0])) arguments[0][0] = arguments[0][0].green
		else arguments[0] = arguments[0] ? arguments[0].green : ''
		logger.info(this._log.apply(this, arguments))
	},

	debug() {
		if (Array.isArray(arguments[0])) arguments[0][0] = arguments[0][0].cyan
		else arguments[0] = arguments[0] ? arguments[0].cyan : ''
		logger.debug(this._log.apply(this, arguments))
	},

	error() {
		if (Array.isArray(arguments[0])) arguments[0][0] = arguments[0][0].red
		else arguments[0] = arguments[0] ? arguments[0].red : ''
		logger.error(this._log.apply(this, arguments))
	},

	warn() {
		if (Array.isArray(arguments[0])) arguments[0][0] = arguments[0][0].yellow
		else arguments[0] = arguments[0] ? arguments[0].yellow : ''
		logger.warn(this._log.apply(this, arguments))
	}
}