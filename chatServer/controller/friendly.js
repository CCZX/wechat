const FRIEND = require('./../models/friendly')
const NEWS = require('./../models/news')

// 查询我的好友列表
const getMyFriends = (req, res) => {
  let { id } = req.query
  FRIEND.findFriendByUserM(id).then(userM => {
    FRIEND.findFriendByUserY(id).then(userY => {
      let data = []
      console.log(id, userM, userY)
      userM.forEach(item => {
        data.push({
          createDate: item.createDate,
          nickname: item.userY.nickname,
          photo: item.userY.photo,
          signature: item.userY.signature,
          _id: item.userY._id,
          roomid: id + '-' + item.userY._id
        })
      })
      userY.forEach(item => {
          data.push({
            createDate: item.createDate,
            nickname: item.userM.nickname,
            photo: item.userM.photo,
            signature: item.userM.signature,
            _id: item.userM._id,
            roomid: item.userM._id + '-' + id
          })
      })
      return res.json({
        status: 2000,
        data: data,
        msg: '获取好友列表成功'
      })
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误！'
    })
  })
}

const getRecentConversation = async (req, res) => {
  const { recentFriendIds = [], userId } = req.body
  const data = await FRIEND.find({
    $or: [
      {userM: {$in: recentFriendIds}, userY: userId},
      {userY: {$in: recentFriendIds}, userM: userId}
    ]
  }).populate({path: 'userY', select: 'signature photo nickname'}).populate({path: 'userM', select: 'signature photo nickname'})
  return res.json({
    status: 2000,
    data,
    msg: '获取成功'
  })
}

// 在同意之后添加好友
const addFriend = (data) => {
  FRIEND.find(data).then(doc => {
    if (doc.length === 0) {
      FRIEND.insertMany(data)      
    }
  })
}

module.exports = {
  getMyFriends,
  addFriend,
  getRecentConversation
}
