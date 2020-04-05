// 用户数据模型
const DB = require('./../utils/connectDB')
const Schema = DB.Schema
const superUserSchema = new Schema({
  /**
   * 账号，目前没有账号池，系统分配一个具有全部权限的账号
   * 账号最好是6位数
   */
  name: {
    type: String,
    required: true
  },
  /**密码 */
  password: {
    type: String,
    required: true
  },
  /**角色分类：超级管理员0，具有增删改查权限；普通管理员1，只有有查的权限 */
  role: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    default: 'co-messager-admin'
  },
  avatar: {
    type: String,
    default: '',
    required: false
  }
})
const superUser = DB.model('superuser', superUserSchema)

module.exports = superUser
