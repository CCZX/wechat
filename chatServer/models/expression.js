// 表情包数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const expressionSchema = new Schema({
  name: String,
  info: String,
  list: Array
})
const expression = DB.model('expression', expressionSchema)

module.exports = expression
