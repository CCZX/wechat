const PYQ_NEWS = require('./../models/pyqNews')

// 用户在朋友圈发表动态
const publishPyqNews = async (req, res) => {
  const { userId, createDate, content } = req.body
  const data = {
    userId, createDate, content
  }
  try {
    const doc = await PYQ_NEWS.insertMany(data)
    return res.json({
      status: 2000,
      data: doc,
      msg: '发表成功'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: error,
      msg: '服务端错误！'
    })
  }
}

module.exports = {
  publishPyqNews
}
