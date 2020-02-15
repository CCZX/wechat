const GROUP_USER = require('./../models/group').groupUser
const GROUP = require('./../models/group').group
const { insertNewGroupNews } = require('./groupNews')

const getMyGroup = (req, res) => { // 获取我的群聊
  let { userName } = req.query
  GROUP_USER.findGroupByUserName(userName).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '获取群聊成功'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误，请稍后重试！'
    })
  })
}

const getGroupInfo = (req, res) => { // 获取群聊详情
  let { id } = req.query
  GROUP.find({_id: id}).then(group => {
    if (group.length) {
      GROUP_USER.findGroupUsersByGroupId(id).then(users => {
        return res.json({
          status: 2000,
          data: {group, users},
          msg: '获取群聊详情成功'
        })
      })
    } else {
      return res.json({
        status: 2001,
        data: '',
        msg: '未获取到群聊信息'
      })
    }
  }).catch(err => {
    console.log(err)
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误，请稍后重试！'
    })
  })
}

const searchGroup = async (req, res) => { // 在客户端搜索群聊
  const { type, q, page, pageSize } = req.query
  GROUP.searchGroup( type, q, page, pageSize ).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: 'success'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务器错误，请稍后重试！'
    })
  })
}

// 给群聊添加新成员
const addNewGroupUser = (data) => {
  const { userId, groupId, userName } = data
  GROUP_USER.find({
    userId: userId
  }).then(doc => {
    if (doc.length === 0) {
      GROUP_USER.insertMany(data).then(doc => {
        GROUP.update({
          _id: groupId
        }, { $inc: {userNum: 1} })
        const sysTipsNews = {
          roomid: groupId,
          message: `${userName}加入群聊`,
          messageType: 'sys',
          isReadUser: []
        }
        insertNewGroupNews(sysTipsNews)
      })
    }
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务器错误，请稍后重试！'
    })
  })
}

module.exports = {
  getMyGroup,
  getGroupInfo,
  searchGroup,
  addNewGroupUser
}
