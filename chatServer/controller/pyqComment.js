const PYQ_COMMENT = require('./../models/pyqComment')

// 用户添加评论
const doComment = (req, res) => {
  const { pyqId, content, authorId, parentId = '', level = 0, replyToAuthorInfo = {} } = req.body
  console.log(req.body)
  const newComment = {
    pyqId,
    content,
    authorId,
    parentId,
    level,
    replyToAuthorInfo
  }
  PYQ_COMMENT.insertMany(newComment).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '评论成功'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误'
    })
  })
}

module.exports = {
  doComment
}
