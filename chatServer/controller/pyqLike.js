const PYQ_LIKE = require('./../models/pyqLike')

// 点赞
const doLike = async (req, res) => {
  const { pyqId, authorId } = req.body
  PYQ_LIKE.find({
    pyqId,
    authorId
  }).then(doc => {
    if (doc.length > 0) {
      return res.json({
        status: 2004,
        data: '',
        msg: '你已经点过赞了'
      })
    } else {
      const newLike = {pyqId, authorId}
      PYQ_LIKE.insertMany(newLike).then(doc1 => {
        return res.json({
          status: 2000,
          data: doc1,
          msg: '点赞成功'
        })
      })
    }
  }).catch(err => {
    return res.josn({
      status: 2003,
      data: err,
      msg: '服务器错误'
    })
  })
}

module.exports = {
  doLike
}
