// 连接数据库操作
// const DB_URL = 'mongodb://127.0.0.1:27017/wechat'
const DB_URL = 'mongodb://127.0.0.1:27017/chat'
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, {
  useNewUrlParser: true
})
mongoose.Promise = global.Promise
module.exports = mongoose
