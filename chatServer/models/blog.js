const DB = require('../utils/connectDB')
const Schema = DB.Schema

const blogSchema = new Schema({
  authorId: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  /**类别，只能属于一个类别 */
  category: {
    type: Object,
    default: {}
  },
  /**标签[{},{}...] */
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
  /**点赞数 */
  likeNum: {
    type: Number,
    default: 0
  },
  /**创建日期 */
  createDate: {
    type: Date,
    default: Date.now
  },
  /**更新日期 */
  updateDate: {
    type: Date,
    default: Date.now
  }
})

const blog = DB.model('blog', blogSchema)

module.exports = blog
