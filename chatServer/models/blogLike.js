const DB = require('../utils/connectDB')
const Schema = DB.Schema

const blogLikeSchema = new Schema({
  authorId: {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'blog'
  },
  /**创建日期 */
  createDate: {
    type: Date,
    default: Date.now
  },
})

const blogLike = DB.model('blogLike', blogLikeSchema)

module.exports = blogLike
