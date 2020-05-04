// 好友数据模型
const DB = require('../utils/connectDB')
const Schema = DB.Schema

const blogSchema = new Schema({
  authorId: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  /**类别 */
  category: {
    type: Array,
    default: []
  },
  /**标签 */
  tags: {
    type: Array,
    default: []
  },
  /**封面 */
  cover: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: String
  },
  /**内容 */
  content: {
    type: String,
    default: ''
  },
  /**描述 */
  desc: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

const blog = DB.model('blog', blogSchema)

module.exports = blog
