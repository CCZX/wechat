const NEWS = require('./../models/news')

const insertNewNews = async (news) => {
  const data = await NEWS.insertMany(news)
  console.log(data)
}

const getRecentNews = async (req, res) => {
  const { roomid } = req.query
  try {
    const data = await NEWS.find({
      roomid: roomid
    }).limit(30)
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

module.exports = {
  insertNewNews,
  getRecentNews
}
