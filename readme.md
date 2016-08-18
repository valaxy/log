[![dependencies Status](https://david-dm.org/valaxy/log/status.svg?style=flat-square)](https://david-dm.org/valaxy/log)

- Under development
- Guide about how to log clearly 
- And implementation which exposes some helpful log functions

# Guide
- 日志级别
  - error
  - warn
  - info
  - debug
- 标签
  - 每条日志应该开头添加一个或多个带有总结性的与日志紧密相关的词，称之为标签
  - 标签概括了该条日志某个维度的内容
  - 总是添加上表示日志级别的标签
- 缩进
  - 相邻日志可能具有附属关系，使用缩进来表示这种关系
- 颜色
  - 为不同日志级别的标签赋予不同颜色
  - 为其他重要的标签赋予颜色
  - 为关键性的日志或词染色
- 序列化
  - 将Object/Array等结构化数据序列化
- 时间戳


# Usage
```javascript
var log = require('log').openConsole()

log.info('tag', 'this is info')
log.warn('tag', 'this is warn')
log.error('tag', 'this is error')
log.debug('tag', 'this is debug')

log.info('tag', 1, 'this is\nindent info')
log.warn('tag', 1, 'this is\nindent warn')
log.error('tag', 1, 'this is\nindent error')
log.debug(null, 1, 'this is\nindent debug')

```

# Reference
- http://www.cnblogs.com/kofxxf/p/3713472.html about log level

More references or articles are welcome!
