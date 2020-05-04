const Hljs = require('highlight.js/lib/highlight')

Hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
Hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
Hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
Hljs.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'))
Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
Hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
Hljs.registerLanguage('http', require('highlight.js/lib/languages/http'))
Hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
Hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
Hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
Hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
Hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
Hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
Hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))

Hljs.configure({
  classPrefix: ''     // don't append class prefix
})

module.exports = Hljs
