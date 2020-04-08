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
  `${API_VERSION}/sys/faceimg`,
  /**根路径 */
  `/`,
  /**admin */
  '/admin'
]

/**需要管理员权限，role === 0 ||１ */
const USE_ADMIN = [
  /**获取所有用户，根据所有用户的信息做统计分析  Read */
  `${API_VERSION}/user/getalluser`,
  /**根据注册时间来获取用户，做折线图 Read */
  `${API_VERSION}/user/getuserbysigntime`,
  /**修改用户的状态，需要超级管理员 Update */
  `${API_VERSION}/user/changestatus`,
  /**获取当前在线用户，Read */
  `${API_VERSION}/user/onlineusers`,

  /**获取系统信息，Read */
  `${API_VERSION}/sys/syssituation`,

  /**添加新的管理员，Create */
  `${API_VERSION}/superuser/add`,
  /**获取所有的管理员，Read */
  `${API_VERSION}/superuser/all`,
  
  /**获取所有群聊，Read */
  `${API_VERSION}/group/all`
]

/**需要超级管理员, role === 0 */
const USE_SUPER_ADMIN = [
  /**修改用户的状态，需要超级管理员 Update */
  `${API_VERSION}/user/changestatus`,
  /**添加新的管理员，Create */
  `${API_VERSION}/superuser/add`
]


module.exports = {
  ACCESS_KEY,
  SECRET_KEY,
  BUCKET,
  TOKEN_SECRET,
  WHITE_LIST,
  USE_ADMIN,
  USE_SUPER_ADMIN
}
