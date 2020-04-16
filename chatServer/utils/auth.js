const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, WHITE_LIST } = require('./config')

module.exports = {
  createToken(str) {
    return jwt.sign({str}, TOKEN_SECRET, {expiresIn: '1h'})
  },
  checkToken(req, res, next){
    try {
      const token = req.headers.authorization
      const origin = req.originalUrl
      if (WHITE_LIST.includes(origin)) {
        next()
      } else {
        if (token) {
          const userId = jwt.verify(token, TOKEN_SECRET).str
          if (!userId) {
            return res.json({
              status: 1006,
              data: [],
              msg: "登录过期！"
            })
          } else {
            next()
          }
        } else {
          return res.json({
            status: 2002,
            data: [],
            msg: "用户未登录！"
          })
        }
      }
    } catch (error) {
      return res.json({
        status: 1006,
        data: error,
        msg: '登录过期！'
      })
    }
  },
  /**将token解析未userid */
  parseToken(token) {
    const userId = jwt.verify(token, TOKEN_SECRET).str
    return userId
  }
}