const USER = require('./../models/user')
const ACCOUNTBASE = require('./../models/accountpool')
const md5 = require('./../utils').md5
const cvCode = require('./../utils/cvCode').cvCode
const randomNickname = require('./../utils/index').randomNickname
const { monthAgo, nextMonth } = require('./../utils')
let verificationCode = ''

// 验证码
const generatorCode = (req, res) => {
  verificationCode = cvCode()
  return res.json({
    status: 2000,
    data: verificationCode,
    msg: 'code success'
  })
}

// 登录
const login = (req, res) => {
  let { account, password, cvCode, setting } = req.body
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
        USER.update({
          $or: [{"name": account}, {"code": account}]
        }, {
          lastLoginTime: Date.now(),
          loginSetting: setting
        }).then(up => {
          console.log('upSuccess', up)
        })
        req.session.login = doc.name
        return res.json({
          status: 1000,
          data: doc,
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
  let { account, password, rePassword, cvCode } = req.body
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
            nickname: randomNickname()
          }).then(doc2 => {
            console.log(doc2)
            if (doc2['_id']) {
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
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务器错误，请稍后重试！'
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

module.exports = {
  login,
  generatorCode,
  register,
  getUserInfo,
  preFetchUser,
  getAllUser,
  getUserBySignUpTime,
  changeUserStatus
}
