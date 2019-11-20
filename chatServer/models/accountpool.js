// 账号池数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const accountpoolSchema = new Schema({
  code: String,
  status: String, // 1 已使用 0 未使用
  special: String,
  type: String, // 1 用户 2 群聊
  random: Number
})

const accountpool = DB.model('accountBase', accountpoolSchema)

module.exports = accountpool
