const USER = require('./../models/user')
const ACCOUNTBASE = require('./../models/accountpool')
const md5 = require('./../utils').md5
const cvCode = require('./../utils/cvCode').cvCode
const { createToken, parseToken } = require('./../utils/auth')
const randomNickname = require('./../utils/index').randomNickname
const { onLineUser } = require('./../app')
const { addFriend } = require('./friendly')
const { addNewGroupUser } = require('./group')
let verificationCode = ''
const officialID = '5d9d8ee6d9b830535013abaa'
const officialGroupID = '5e803e809c5b2d2f9416f78c'

// 验证码
const generatorCode = (req, res) => {
  const { code, timestamp } = cvCode()
  verificationCode = code
  return res.json({
    status: 2000,
    data: verificationCode,
    timestamp,
    msg: 'code success'
  })
}

// 登录
const login = (req, res) => {
  let { account, password, cvCode, cvCodeTimestamp, setting } = req.body
  const nowTimestamp = Date.now()
  if (nowTimestamp - cvCodeTimestamp > 60000) {
    return res.json({
      status: 1007,
      data: [],
      msg: '验证码超时'
    })
  }
  if (cvCode.toLocaleUpperCase() !== verificationCode) {
    return res.json({
      status: 1002,
      data: '',
      msg: '验证码错误'
    })
  }
  USER.findOne({
    $or: [{"name": account}, {"code": account}]
  }).then(doc => {
    if (doc === null) {
      return res.json({
        status: 1001,
        data: '',
        msg: '账号或密码错误'
      })
    }
    if (doc.status !== 0) {
      if (doc.status === 1) {
        return res.json({
          status: 1006,
          data: '',
          msg: '账号被冻结'
        })
      } else if (doc.status === 2) {
        return res.json({
          status: 1006,
          data: '',
          msg: '账号被注销'
        })
      }
    }
    if (doc) {
      let pass = md5(password)
      if (doc.pass === pass) {
        const onlineUserIds = Object.values(onLineUser).map(item => item._id)
        if (onlineUserIds.includes((doc._id).toString())) {
          return res.json({
            status: 1001,
            data: null,
            msg: '用户已经在别处登录了！'
          })
        }
        USER.update({
          $or: [{"name": account}, {"code": account}]
        }, {
          lastLoginTime: Date.now(),
          loginSetting: setting
        }).then(up => {
          console.log('upSuccess', up)
        })
        req.session.login = doc.name
        const userId = doc._id
        const token = createToken(userId)
        return res.json({
          status: 1000,
          data: doc,
          token: token,
          msg: '登录成功'
        })
      } else {
        return res.json({
          status: 1001,
          data: [],
          msg: '账号或密码错误'
        })
      }
    } else {
      return res.json({
        status: 1001,
        data: '',
        msg: '用户或密码错误'
      })
    }
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误'
    })
  })
}

// 注册
const register = (req, res) => {
  let { account, password, rePassword, cvCode, avatar } = req.body
  if (password !== rePassword) {
    return res.json({
      status: 1004,
      data: '',
      msg: '两次密码不一致'
    })
  }
  if (cvCode.toLocaleUpperCase() !== verificationCode) {
    return res.json({
      status: 1002,
      data: '',
      msg: '验证码错误'
    })
  }
  USER.find({
    name: account
  }).then(doc => {
    if (doc.length) {
      return res.json({
        status: 1003,
        data: '',
        msg: '用户已被注册,请换个用户名重试'
      })
    } else {
      // const random = Math.random()
      ACCOUNTBASE.findOneAndUpdate({
        // type: '1', status: '0', random: { $gte: random }}, { status: '1' }
        type: '1', status: '0'}, { status: '1' }
      ).then(doc1 => {
        if (!doc1) {
          return res.json({
            status: 1004,
            data: '',
            mag: '用户注册已达到上限'
          })
        } else {
          const pass = md5(password)
          USER.create({
            name: account,
            pass: pass,
            code: doc1.code,
            photo: avatar,
            nickname: randomNickname()
          }).then(doc2 => {
            console.log(doc2)
            if (doc2['_id']) {
              // addFriend({userM: officialID, userY: doc2['_id']})
              // addNewGroupUser({userId: doc2['_id'], groupId: officialGroupID, userName: doc2.name})
              return res.json({
                status: 1005,
                data: doc1.code,
                msg: '注册成功'
              })
            } else {
              return res.json({
                status: 1004,
                data: '',
                msg: '注册失败,请重新尝试'
              })
            }
          })
        }
      }).catch(err => {
        res.json({
          status: 2003,
          data: err,
          msg: '服务器内部错误'
        })
      })
    }
  })
}

// 获取用户信息
const getUserInfo = (req, res) => {
  let { id } = req.query
  USER.findById({
    _id: id
  }).then(doc => {
    if (doc) {
      return res.json({
        status: 2000,
        data: doc,
        msg: '获取用户详情成功！'
      })
    } else {
      return res.json({
        status: 2001,
        data: '',
        msg: '没有获取到用户数据！'
      })
    }
  }).catch(err => {
    res.json({
      status: 2003,
      data: '',
      msg: '服务端错误，请稍后重试！'
    })
  })
}

// 预获取用户列表,在添加好友的时候根据查询字符获取
const preFetchUser = (req, res) => {
  const { type, q, page, pageSize } = req.query
  const reg = new RegExp(q)
  USER.find({
    [type]: {$regex: reg}
  }).limit(Number(pageSize)).skip(Number(page) * Number(pageSize)).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '获取成功！'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务器错误，请稍后重试！'
    })
  })
}

// 获取所有用户(在Admin端获取)
const getAllUser = (req, res) => {
  USER.find().then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '获取用户成功'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务器错误，请稍后重试！'
    })
  })
}

// 根据注册时间获取用户
const getUserBySignUpTime = (req, res) => {
  const { gt, lt } = req.query
  const gtDate = new Date(gt)
  const ltDate = new Date(lt)
  USER.find({'signUpTime': {$lte: ltDate ,$gte: gtDate}}).sort({'signUpTime': -1}).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '成功'
    })
  })
}

// 更改用户的状态(status)
const changeUserStatus = (req, res) => {
  const { id, state } = req.body
  USER.findByIdAndUpdate({'_id': id}, {
    'status': state
  }).then(doc => {
    res.json({
      status: 2000,
      data: doc,
      msg: 'success'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      dataL: err,
      msg: '服务器错误，请稍后重试！'
    })
  })
}

// 添加新的分组
const addNewFenzu = async (req, res) => {
  const { name, userId } = req.body
  const userInfo = await USER.findOne({_id: userId})
  const friendFenzu = userInfo.friendFenzu
  const friendFenzuKeys = Object.keys(friendFenzu)
  // const isHas = name in friendFenzu
  let newFriendFenzu = null
  if (!friendFenzuKeys.includes(name)) {
    newFriendFenzu = Object.assign({}, friendFenzu, {[name]: []})
  } else {
    newFriendFenzu = friendFenzu
  }
  const upDoc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {friendFenzu: newFriendFenzu}
  })
  return res.json({
    status: 2000,
    data: upDoc,
    msg: '添加新分组成功'
  })
}

// 删除分组
const deleteFenzu = async (req, res) => {
  const { fenzuName, userId } = req.body
  const userInfo = await USER.findOne({_id: userId})
  const friendFenzu = userInfo.friendFenzu
  const newFriendFenzu = JSON.parse(JSON.stringify(friendFenzu))
  delete newFriendFenzu[fenzuName]
  const upDoc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {friendFenzu: newFriendFenzu}
  })
  return res.json({
    status: 2000,
    data: upDoc,
    msg: '删除成功！'
  })
}

// 编辑某项分组的名称
const editFenzu = async (req, res) => {
  const { oldFenzu, newFenzu, userId } = req.body
  const userInfo = await USER.findOne({_id: userId})
  const friendFenzu = userInfo.friendFenzu
  const newFriendFenzu = JSON.parse(JSON.stringify(friendFenzu))
  const oldFenzuUsers = friendFenzu[oldFenzu]
  delete newFriendFenzu[oldFenzu]
  newFriendFenzu[newFenzu] = oldFenzuUsers
  const upDoc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {friendFenzu: newFriendFenzu}
  })
  return res.json({
    status: 2000,
    data: upDoc,
    msg: '更新成功！'
  })
}

// 修改好友分组
const modifyFrienFenzu = async (req, res) => {
  const { userId, friendId, newFenzu } = req.body
  const userInfo = await USER.findOne({_id: userId})
  const friendFenzu = JSON.parse(JSON.stringify(userInfo.friendFenzu))
  // 找到原来的分组
  let oldFenzu = ''
  for (const key in friendFenzu) {
    if (friendFenzu.hasOwnProperty(key)) {
      const element = friendFenzu[key];
      if (element.includes(friendId)) {
        oldFenzu = key
      }
    }
  }
  if (oldFenzu === newFenzu) {
    return res.json({
      status: 2000,
      data: '',
      msg: '已经在次分组'
    })
  }
  // 如果原来已经在某个分组就从中去掉
  if (oldFenzu) {
    const olfFenzuIdsIndex = friendFenzu[oldFenzu].findIndex(item => item === friendId)
    friendFenzu[oldFenzu].splice(olfFenzuIdsIndex, 1)
  }
  // 加入新的分组
  friendFenzu[newFenzu].push(friendId)
  console.log(friendFenzu)
  const upDoc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {friendFenzu: friendFenzu}
  })
  return res.json({
    status: 2000,
    data: upDoc,
    msg: '跟新成功'
  })
}

// 修改好友备注
const modifyBeizhu = async (req, res) => {
  const {userId, friendId, friendBeizhu} = req.body
  const userInfo = await USER.findOne({_id: userId})
  const beizhuMap = userInfo.friendBeizhu
  const newBeizhuMap = Object.assign({}, beizhuMap, {[friendId]: friendBeizhu})
  const upDoc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {friendBeizhu: newBeizhuMap}
  })
  return res.json({
    status: 2000,
    data: upDoc,
    msg: '修改备注成功！'
  })
}

// 更新在线时长
const updateUserOnlineTime = async (data) => {
  const { userId, time } = data
  console.log(time)
  const doc = await USER.findByIdAndUpdate({
    _id: userId
  }, {
    $inc: {onlineTime: Number(time)}
  })
  return doc
}

// 更新用户信息
const updateUserInfo = async (req, res) => {
  /**
   * field：更新的项，比如昵称、性别等
   * value：更新的值
   * userId：用户的ID
   */
  try {
    const { field, value, userId } = req.body
    if (parseToken(req.headers.authorization) !== userId) {
      return res.json({
        status: 2001,
        data: [],
        msg: '错误操作！'
      })
    }
    const data = await USER.findByIdAndUpdate({
      _id: userId
    }, {
      [field]: value
    })
    return res.json({
      status: 2000,
      data: [],
      msg: '修改成功！'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: error,
      msg: '服务端错误！'
    })
  }
}

// 更新用户密码
const updateUserPwd = async (req, res) => {
  try {
    const { oldPwd, newPwd, reNewPwd, userId } = req.body
    const {pass: userPwd} = await USER.findOne({_id: userId}, {pass: 1})
    const oldPwdMD5 = md5(oldPwd)
    const newPwdMD5 = md5(newPwd)
    if (parseToken(req.headers.authorization) !== userId) {
      return res.json({
        status: 2001,
        data: [],
        msg: '错误操作！'
      })
    }
    if (userPwd !== oldPwdMD5) {
      return res.json({
        status: 2001,
        data: [],
        msg: '原始密码输入错误！'
      })
    }
    if (newPwd !== reNewPwd) {
      return res.json({
        status: 2001,
        data: [],
        msg: '两次密码不一致！'
      })
    }
    const data = await USER.findByIdAndUpdate({
      _id: userId
    }, {
      pass: newPwdMD5
    })
    return res.json({
      status: 2000,
      data: [],
      msg: '更新成功，请牢记你的新密码！'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: [],
      msg: '服务端错误！'
    })
  }
}

module.exports = {
  login,
  generatorCode,
  register,
  getUserInfo,
  preFetchUser,
  getAllUser,
  getUserBySignUpTime,
  changeUserStatus,
  addNewFenzu,
  deleteFenzu,
  editFenzu,
  modifyFrienFenzu,
  modifyBeizhu,
  updateUserOnlineTime,
  updateUserInfo,
  updateUserPwd
}
