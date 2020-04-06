const superUser = require('../models/superUser')
const { createToken } = require('./../utils/auth')

/**登录 */
const login = async (req, res) => {
  console.log('superuserloginsuperuserloginsuperuserloginsuperuserloginsuperuserlogin', req.body)
  const { name, password } = req.body
  // console.log('req.originalUrl', req.originalUrl)
  const userInfo = await superUser.findOne({
    name
  })
  if (!userInfo) {
    return res.json({
      status: 1001,
      data: null,
      msg: '账号或密码错误'
    })
  }
  const pwd = userInfo.password
  if (pwd !== password) {
    return res.json({
      status: 1001,
      data: null,
      msg: '账号或密码错误'
    })
  } else {
    return res.json({
      status: 1000,
      data: {
        userInfo: userInfo,
        token: createToken(userInfo._id)
      },
      msg: '登录成功'
    })
  }
}

/**添加 */
const add = async (req, res) => {
  const { name, password, role } = req.body
  const newSuperUser = await superUser.create({
    name,
    password,
    role
  })
  return res.json({
    status: 2000,
    data: newSuperUser,
    msg: '添加管理员成功'
  })
}

/**获取所有管理员用户 */
const getAllSuperUser = async (req, res) => {
  const superUserList = await superUser.find()
  return res.json({
    status: 2000,
    data: superUserList,
    msg: '获取成功！'
  })
}

module.exports = {
  login,
  add,
  getAllSuperUser
}
