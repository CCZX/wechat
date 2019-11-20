// 群聊数据模型以及群聊用户数据模型
const DB = require('./../utils/connectDB')
const Schema = DB.Schema

const groupSchema = new Schema({
  title: String,
  desc: String,
  img: String,
  code: String,
  userNum: Number, // 群成员数量，避免某些情况需要多次联表查找，如搜索；所以每次加入一人，数量加一
  createDate: { type: Date, default: Date.now() }, // 建群时间
  grades: { type: String, default: 'V1' }, // 群等级，备用
  holderName: String // 群主账号
})
const group = DB.model('group', groupSchema)

const groupUserSchema = new Schema({
  groupId: {
    type : Schema.Types.ObjectId,
    ref : 'group'
  },
  userId: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  userName: { type: String },
  manager: { type: Number, default: 0 },
  holder: { type: Number, default: 0 },
  card: String // 群名片
})

groupUserSchema.statics.findGroupByUserName = function (userName, cb) { // 根据用户名查找所在群聊
  return this
        .find({userName: userName})
        .populate('groupId')
        .exec(cb)
}
groupUserSchema.statics.findGroupUsersByGroupId = function (groupId, cb) { // 通过groupId查找群成员
  return this
        .find({groupId: groupId})
        .populate({path: 'userId', select: 'signature photo nickname'})
        .exec(cb)
}

const groupUser = DB.model('groupUser', groupUserSchema)

module.exports = {
  group,
  groupUser
}
