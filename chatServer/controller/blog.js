const Blog = require('./../models/blog')
const BlogCategory = require('./../models/blogCategory')
const BlogTag = require('./../models/blogTags')

/**发表博客 */
const publishBlog = async (req, res) => {
  const { authorId, category, tags, cover, title, content, desc } = req.body
  const blogParams = {authorId, category, tags, cover, title, content, desc}
  new Blog(blogParams).save((err, doc) => {
    if (err) {
      return res.json({
        status: 2003,
        data: err,
        msg: '服务端错误，请稍后重试！'
      })
    }
    return res.json({
      status: 2000,
      data: doc,
      msg: '发表成功！'
    })
  })
}

/**获取博客列表 */
const getBlogList = async (req, res) => {
  const data = await Blog.find().populate({path: 'authorId', select: 'nickname photo signature onlineTime'})
  return res.json({
    status: 2000,
    data: data,
    msg: 'ok'
  })
}

/**查看博客内容 */
const getBlogInfo = async (req, res) => {
  try {
    const { id } = req.query
    const data = await Blog.findOne({
      _id: id
    }).populate({path: 'authorId', select: 'nickname photo signature onlineTime'})
    return res.json({
      status: 2000,
      data: data,
      msg: 'ok'
    })
  } catch (error) {
    
  }
}

/**获取分类列表 */
const getCategoryList = async (req, res) => {
  try {
    const data = await BlogCategory.find()
    return res.json({
      status: 2000,
      data: data,
      msg: 'ok'
    })
  } catch (error) {
    
  }
}

const getTagList = async (req, res) => {
  const { cateId } = req.query
  try {
    const data = await BlogTag.find({
      categoryId: cateId
    })
    return res.json({
      status: 2000,
      data: data,
      msg: 'ok'
    })
  } catch (error) {
    
  }
}

module.exports = {
  publishBlog,
  getBlogList,
  getBlogInfo,
  getCategoryList,
  getTagList
}
