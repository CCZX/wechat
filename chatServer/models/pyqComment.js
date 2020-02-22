// 朋友圈评论表
const DB = require('./../utils/connectDB')
const Schema = DB.Schema

const pyqCommentSchema = new Schema({
  pyqId: { // 该评论对应的朋友圈id
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
  parentId: { // 父评论，比如B评论是回复A评论的，那么A评论就是父评论
    type: String,
    default: ''
  },
  /**
   * 评论的层级，比如对朋友圈的直接评论level为0，回复直接评论level为1，回复对直接评论的评论为2
   */
  level: {
    type: Number,
    default: 0
  },
  /**
   * 用户A发表评论P2评论了朋友圈的直接评论P1，replyToAuthorInfo就是直接评论P1的用户信息
   * 用户B发表评论P3评论了用户A的评论P2，replyToAuthorInfo就是用户A的信息，
   * 需要注意的是P2评论以及P3评论的parentId都是P1的Id
   */
  replyToAuthorInfo: {
    type: Object,
    default: {}
  }
})

const pyqComment = DB.model('pyqComment', pyqCommentSchema)

module.exports = pyqComment
