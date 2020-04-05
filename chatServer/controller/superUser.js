const superUser = require('../models/superUser')
const { createToken } = require('./../utils/auth')

/**登录 */
const login = async (req, res) => {
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

module.exports = {
  login
}
