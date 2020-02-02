// 系统用户数据模型
const DB = require('./../utils/connectDB')
const Schema = DB.Schema

const systemUserSchema = new Schema({
  code: {
    type: String
  },
  nickname: {
    type: String
  },
  status: {
    type: Number
  }
})

const systemUser = DB.model('systemUser', systemUserSchema)

module.exports = systemUser
