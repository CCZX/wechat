/**判断用户是否是管理员的中间件 */

const { USE_ADMIN, USE_SUPER_ADMIN, TOKEN_SECRET } = require('./../utils/config')
const jwt = require('jsonwebtoken')
const superUser = require('./../models/superUser')

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization
  const origin = req.originalUrl
  /**不要管理员权限的接口 */
  if (!USE_ADMIN.includes(origin)) {
    return next()
  }
  const _id = jwt.verify(token, TOKEN_SECRET).str
  const adminUser = await superUser.findOne({
    _id
  })
  console.log('adminUseradminUseradminUser', adminUser)
  /**系统管理员数据库中没有该账号，提示权限不足 */
  if (!adminUser) {
    return res.json({
      status: 4001,
      data: null,
      msg: '没有操作权限'
    })
  }
  /**role === '0'的全部权限用户 */
  if (adminUser.role === '0') {
    next()
  /**role === '1'的普通管理员 */
  } else if (adminUser.role === '1') {
    /**访问街廓不需要super_admin */
    if (!USE_SUPER_ADMIN.includes(origin)) {
      next()
    } else {
      /**需要super_admin，提示权限不足 */
      return res.json({
        status: 4001,
        data: null,
        msg: '没有操作权限'
      })
    }
  }
}

module.exports = isAdmin
