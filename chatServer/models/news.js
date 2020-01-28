// 消息数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema
// const messageSchema = new Schema({
//   roomid: String, // 房间id
//   name: String, // 用户登录名
//   nickname: String, // 用户昵称
//   time: String, // 时间
//   avatar: String, // 用户头像
//   mes: String, // 消息
//   read: Array, // 是否已读 0/1
//   signature: String, // 个性签名
//   emoji: String, // 表情地址
//   style: String, // 消息类型 emoji/mess/img/file
//   groupId: String, // 加入群聊id
//   groupName: String, // 加入群聊名称
//   groupPhoto: String, //加入群聊头像
//   userM: {
//     type : db.Schema.ObjectId,
//     ref : 'users'
//   }, // 申请人id、消息发送人
//   userY: String, // 好友id
//   userYname: String, // 好友昵称
//   userYphoto: String, // 好友头像
//   userYloginName: String, // 好友登录名
//   friendRoom: String, // 好友房间
//   state: String, // group/ frend
//   type: String, // validate
//   status: String // 0 未操作 1 同意 2 拒绝
// })

const newsSchema = new Schema({
  roomid: String,
  senderId: { // 发送者Id
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  senderName: String, // 发送者登录名
  senderNickname: String, // 发送者昵称
  senderAvatar: String, // 发送者头像
  time: String, // 消息发送时间
  message: String, // 消息内容
  messageType: String, // 消息的类型：emoji/text/img/file

})

const message = DB.model('new', newsSchema)

module.exports = message
