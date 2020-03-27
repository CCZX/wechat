const NEWS = require('./../models/news')

const insertNewNews = async (news) => {
  const data = await NEWS.insertMany(news)
  console.log(data)
  return data[0]
}

const getRecentNews = async (req, res) => {
  const { roomid, page, pageSize } = req.query
  try {
    const data = await NEWS.find({
      roomid: roomid
    }).sort({_id: -1}).skip(Number(page*pageSize)).limit(Number(pageSize))
    return res.json({
      status: 2000,
      data,
      msg: '获取成功'
    })
  } catch (error) {
    res.json({
      status: 2003,
      data: error,
      msg: '服务端错误，请稍后重试！'
    })
  }
}

const getLastNews = async (req, res) => {
  const { roomid } = req.body
  const data = await NEWS.findOne({
    roomid
  }).sort({_id: -1})
  return res.json({
    status: 2000,
    data,
    msg: '获取成功'
  })
}

const userIsReadMsg = async (req, res) => {
  const { roomid, userId } = req.body
  const data = await NEWS.updateMany({
    roomid
  }, {
    $addToSet: {isReadUser: userId}
  })
  return res.json({
    status: 2000,
    data: data,
    msg: 'success'
  })
}

module.exports = {
  insertNewNews,
  getRecentNews,
  getLastNews,
  userIsReadMsg
}
