
const checkToken = require('./islogin')
const isAdmin = require('./isadmin')

const useMiddleware = (app) => {
  app.use(checkToken)
  app.use(isAdmin)
}

module.exports = useMiddleware
