// 系统用户数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const validateNewsSchema = new Schema({
  roomid: String,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  senderName: String,
  senderNickname: String, // 发送者昵称
  senderAvatar: String, // 发送者头像
  reveiverId: { // 接收者ID
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  time: String, // 消息发送时间
  additionMessage: String, // 附加消息
  status: Number, // 0/1/2，未处理/同意/不同意
  validateType: Number, /// 0/1, 好友/群聊
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  }
})

const validateNews = DB.model('validateNews', validateNewsSchema)

module.exports = validateNews
