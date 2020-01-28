const FRIEND = require('./../models/friendly')

// 查询我的好友列表
const getMyFriends = (req, res) => {
  let { id } = req.query
  FRIEND.findFriendByUserM(id).then(userM => {
    FRIEND.findFriendByUserY(id).then(userY => {
      let data = []
      userM.forEach(v => {
        data.push({
          createDate: v.createDate,
          nickname: v.userY.nickname,
          photo: v.userY.photo,
          signature: v.userY.signature,
          _id: v.userY._id,
          roomid: id + '-' + v.userY._id
        })
      })
      userY.forEach(v => {
          data.push({
            createDate: v.createDate,
            nickname: v.userM.nickname,
            photo: v.userM.photo,
            signature: v.userM.signature,
            _id: v.userM._id,
            roomid: v.userM._id + '-' + id
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

module.exports = {
  getMyFriends
}
