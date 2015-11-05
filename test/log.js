var log = require('../lib/log').openConsole()

log.info('info', 'this is info')
log.warn('warn', 'this is warn')
log.error('error', 'this is error')
log.debug('debug', 'this is debug')

log.info('info', 1, 'this is\nindent info')
log.warn('warn', 1, 'this is\nindent warn')
log.error('error', 1, 'this is\nindent error')
log.debug('debug', 1, 'this is\nindent debug')


// else
log.info(null, 'no tag')
log.info('tag', 'single tag')
log.info(['tag1', 'tag2'], 'two tags')
