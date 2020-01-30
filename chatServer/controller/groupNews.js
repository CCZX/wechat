const GROUP_NEWS = require('./../models/groupNews')

const insertNewGroupNews = async (news) =>  {
  const data = await GROUP_NEWS.insertMany(news)
  console.log(data)
}

/**
 * 获取最近的消息，只能获取最近30条
 * @param {*} req 
 * @param {*} res 
 */
const getRecentGroupNews = async (req, res) => {
  const { roomid } = req.query
  try {
    const data = await GROUP_NEWS.find({roomid}).limit(30)
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
  insertNewGroupNews,
  getRecentGroupNews
}
