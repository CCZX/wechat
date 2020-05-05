const DB = require('../utils/connectDB')
const Schema = DB.Schema

const blogTagSchema = new Schema({
  /**类别 */
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'blogCategory'
  },
  /**名称 */
  name: {
    type: String,
    default: ''
  },
  /**状态，1：发布，0：草稿 */
  status: {
    type: String,
    default: '0'
  },
  /**描述 */
  desc: {
    type: String,
    default: ''
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

const blogTag = DB.model('blogTag', blogTagSchema)

module.exports = blogTag
