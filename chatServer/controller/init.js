const SYS_USER = require('./../models/systemUser')

const validateUser = {
  code: '111111',
  nickname: '验证消息',
  status: 1
}
const initSystemUser = async () => {
  const data = await SYS_USER.insertMany(validateUser)
  console.log('init sysuser success',data)
}

module.exports = {
  initSystemUser
}
