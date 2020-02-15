// 朋友圈评论表
const DB = require('./../utils/connectDB')
const Schema = DB.Schema

const pyqLikeSchema = new Schema({
  pyqId: { // 朋友圈id
    type: Schema.Types.ObjectId,
    ref: 'pyqNews'
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  authorId: { // 点赞者id
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const pyqLike = DB.model('pyqLike', pyqLikeSchema)

module.exports = pyqLike
