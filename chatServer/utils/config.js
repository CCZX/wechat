const { API_VERSION } = require('./../const')
const ACCESS_KEY = 'frWfpDLauQSLS9pLI5fIQEGTxMFnpqfHCrZXn1da'
const SECRET_KEY = 'otLFopTxILdZf8KX9hg1TCTUB1hXj9_SdhKrq1P_'
const BUCKET = 'chenchao'
const TOKEN_SECRET = 'ronaldo'

/**不需要验证token的白名单 */
const WHITE_LIST = [
  /**普通用户登录注册 */
  `${API_VERSION}/user/login`,
  `${API_VERSION}/user/register`,
  `${API_VERSION}/user/getcode`,
  /**管理登录 */
  `${API_VERSION}/superuser/login`,
  /**根路径 */
  `/`
]

/**需要管理员权限，role === 0 ||１ */
const USE_ADMIN = [
  
]

/**需要超级管理员, role === 0 */
const USE_SUPER_ADMIN = [

]


module.exports = {
  ACCESS_KEY,
  SECRET_KEY,
  BUCKET,
  TOKEN_SECRET,
  WHITE_LIST
}
