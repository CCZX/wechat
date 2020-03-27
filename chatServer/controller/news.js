const NEWS = require('./../models/news')

// 存入新的消息
const insertNewNews = async (news) => {
  const data = await NEWS.insertMany(news)
  console.log(data)
  return data[0]
}

// 获取好友之间的聊天记录，通过房间id来获取，房间id是由两个好友id组成，所以是唯一的
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

// 获取好友之间的最后一条聊天记录
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

// 在用户切换到某条会话之后将给会话下的所有消息设置为已读
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
