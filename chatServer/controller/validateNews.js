const VALIDATE_NEWS = require('../models/validateNews')

const insertValidateNews = async (news) => {
  const data = await VALIDATE_NEWS.insertMany(news)
  console.log(data)
}

const findMyValidateNews = async (req, res) => {
  const { id } = req.query
  try {
    const data = await VALIDATE_NEWS.find({
      // $or: [
      //   {senderId: id}, {reveiverId: id}
      // ]
      reveiverId: id
    }).populate({path: 'groupId', select: 'title'})
    return res.json({
      status: 2000,
      data,
      msg: '获取数据成功！'
    })
  } catch (error) {
    res.json({
      status: 2003,
      data: error,
      msg: '服务端错误，请稍后重试！'
    })
  }
}

/**
 * 在被申请者对验证消息做出响应后改变消息的status状态：0/1/2，未处理/同意/不同意
 */
const changeValidateNewsStatus = async (data, status) => {
  const { roomid, senderId, receiverId } = data
  const doc = await VALIDATE_NEWS.updateMany({
    roomid,
    senderId,
    receiverId
  }, {
    $set: {
      status: Number(status)
    }
  })
  console.log(doc)
}

module.exports = {
  insertValidateNews,
  findMyValidateNews,
  changeValidateNewsStatus
}
