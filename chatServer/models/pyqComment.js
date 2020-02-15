// 朋友圈评论表
const DB = require('./../utils/connectDB')
const Schema = DB.Schema

const pyqCommentSchema = new Schema({
  pyqId: { // 朋友圈id
    type: Schema.Types.ObjectId,
    ref: 'pyqNews'
  },
  content: { // 评论内容
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  authorId: { // 评论者id
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  parentId: {
    type: String,
    default: ''
  },
  level: { // 评论的层级，比如直接评论就是0，评论别人的评论就是1
    type: Number,
    default: 0
  }
})

const pyqComment = DB.model('pyqComment', pyqCommentSchema)

module.exports = pyqComment
