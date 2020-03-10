// 好友数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const friendlySchema = new Schema({
  userM: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  userY: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  createDate: { type: Date, default: Date.now() }, // 加好友时间
})

friendlySchema.statics.findFriendByUserM = function (userId, cb) { // 联表查询
  return this
        .find({userM: userId}).populate({path: 'userY', select: 'signature photo nickname onlineTime'})
        .exec(cb)
}
friendlySchema.statics.findFriendByUserY = function (userId, cb) {
  return this
        .find({userY: userId}).populate({path: 'userM', select: 'signature photo nickname onlineTime'})
        .exec(cb)
}

const friendly = DB.model('friendly', friendlySchema)

module.exports = friendly
