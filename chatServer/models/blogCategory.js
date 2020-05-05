const DB = require('../utils/connectDB')
const Schema = DB.Schema

const blogCategorySchema = new Schema({
  /**名称 */
  name: {
    type: String,
    default: String
  },
  /**英文 */
  value: {
    type: String,
    default: ''
  },
  /**描述 */
  desc: {
    type: String,
    default: ''
  },
  /**状态，1：发布，0：草稿 */
  status: {
    type: String,
    default: '0'
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

const blogCategory = DB.model('blogCategory', blogCategorySchema)

module.exports = blogCategory
