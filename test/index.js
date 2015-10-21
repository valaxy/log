var assert = require('assert')
var getlog = require('../index')


describe('getlog', function () {
	it('level', function () {
		assert.equal(getlog({}, 'abc'), 'abc')
		assert.equal(getlog({level: 'info'}, 'abc'), 'info abc')
	})

	it('tags', function () {
		assert.equal(getlog({}, '123'), '123')
		assert.equal(getlog({tags: ['t1']}, '123'), 't1 123')
		assert.equal(getlog({tags: ['t1', 't2']}, '123'), 't1 t2 123')
	})

	it('indent', function () {
		assert.equal(getlog({}, '123'), '123')
		assert.equal(getlog({indent: 0}, '123'), '123')
		assert.equal(getlog({indent: 1}, '123'), '    123')
		assert.equal(getlog({indent: 2}, '123'), '        123')
	})

	it('all', function () {
		assert.equal(getlog({
			level : 'debug',
			indent: 2,
			tags  : ['aaa', 'bbb']
		}, 'test data!!!'), '        debug aaa bbb test data!!!')
	})
})