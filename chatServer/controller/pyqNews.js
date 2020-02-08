const PYQ_NEWS = require('./../models/pyqNews')
const FRIEND = require('./../models/friendly')

// 用户在朋友圈发表动态
const publishPyqNews = async (req, res) => {
  const { userId, createDate, content, pictures } = req.body
  const data = {
    userId, createDate, content, pictures
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

const getMyFriendPyqNews = async (req, res) => {
  const { id, page, pageSize } = req.query
  const friendlyList = []
  FRIEND.findFriendByUserM(id).then(userM => {
    FRIEND.findFriendByUserY(id).then(userY => {
      userM.forEach(v => {
        friendlyList.push({
          _id: v.userY._id
        })
      })
      userY.forEach(v => {
        friendlyList.push({
          _id: v.userM._id
        })
      })
      const friendlyIdList = friendlyList.map(item => item._id)
      friendlyIdList.push(id)
      PYQ_NEWS.findUserPyq(id, friendlyIdList, page, pageSize).then(doc => {
        return res.json({
          status: 2000,
          data: doc,
          msg: '获取好友朋友圈成功！'
        })
      })
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
  publishPyqNews,
  getMyFriendPyqNews
}
