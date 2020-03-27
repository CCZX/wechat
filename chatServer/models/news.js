// 消息数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const newsSchema = new Schema({
  roomid: String,
  senderId: { // 发送者Id
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  senderName: String, // 发送者登录名
  senderNickname: String, // 发送者昵称
  senderAvatar: String, // 发送者头像
  time: {
    type: Date,
    default: Date.now
  }, // 消息发送时间
  message: String, // 消息内容
  messageType: String, // 消息的类型：emoji/text/img/file/sys/whiteboard/video/audio
  isReadUser: { // 值为用户的ID，判断已经读取的用户，在发送消息的时候默认发送发已经读取，在单独会话中Array值只有两个
    type: Array,
    required: true
  }
})

const news = DB.model('new', newsSchema)

module.exports = news
