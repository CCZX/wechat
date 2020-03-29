const GROUP_NEWS = require('./../models/groupNews')
const defaultNews = { // 如果没有消息记录设置默认的
  message: '',
  messageType: 'text',
  time: Date.now()
}

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
  const { roomid, pageSize, page } = req.query
  try {
    const data = await GROUP_NEWS.find({roomid}).sort({_id: -1}).skip(Number(page*pageSize)).limit(Number(pageSize))
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

const getGroupHistoryNews = async (req, res) => {
  const { roomid, type, query, date, page, pageSize } = req.body
  const queryReg = new RegExp(query)
  const params = {
    roomid,
    message: {$regex: queryReg}
  }
  if (type !== 'all') {
    params['messageType'] = type
    delete params['message']
  }
  if (!!date) {
    const { today, tomorrow } = todayAndTomorrow(date)
    params['time'] = {$gte: today, $lt: tomorrow}
  }
  const msgList = await GROUP_NEWS.find({
    ...params
  }).skip(Number(page*pageSize)).limit(Number(pageSize))
  const count = await await GROUP_NEWS.find({
    ...params
  }).count()
  console.log('groupHistory', msgList, count)
  return res.json({
    status: 2000,
    data: {
      data: msgList,
      total: count
    },
    msg: 'success'
  })
}

const getGroupLastNews = async (req, res) => {
  const { roomid } = req.body
  const news = await GROUP_NEWS.findOne({
    roomid
  }).sort({_id: -1})
  return res.json({
    status: 2000,
    data: news || {roomid, ...defaultNews},
    msg: 'success'
  })
}

module.exports = {
  insertNewGroupNews,
  getRecentGroupNews,
  getGroupHistoryNews,
  getGroupLastNews
}
