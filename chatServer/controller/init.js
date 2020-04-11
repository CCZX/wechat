const SYS_USER = require('./../models/systemUser')
const db = require('./../utils/connectDB')
const accountBase = require('./../models/accountpool')
const superUser = require('./../models/superUser')

/**系统管理员默认不能注册，初始化超级系统管理员（role===0） */
const initSuperUser = () => {
  new superUser({
    name: 'admin',
    password: '123456',
    role: 0
  }).save((err, doc) => {
    if (!err) {
      console.log('>>>初始化超级系统管理员成功')
    }
  })
}

/**初始化系统用户，用于验证消息的发送 */
const validateUser = {
  code: '111111',
  nickname: '验证消息',
  status: 1
}
const initSystemUser = async () => {
  const data = await SYS_USER.insertMany(validateUser)
  console.log('>>>插入系统用户成功',data)
}

const initAccountPool = () => {
  for (let i = 10000000; i < 10000999; i++) {
    const account = new accountBase({
      code: String(i),
      status: '0',
      type: '1',
      random: Math.random()
    })
    account.save((err, doc) => {
      if (err) {
        console.log(`>>>用户插入错误，code：${i}`)
      } else {
        console.log(`>>>用户插入成功，code：${i}`)
      }
    })
  }
  for (let i = 100000; i < 100999; i++) {
    const account = new accountBase({
      code: String(i),
      status: '0',
      type: '2',
      random: Math.random()
    })
    account.save((err, doc) => {
      if (err) {
        console.log(`>>>群聊插入错误，code：${i}`)
      } else {
        console.log(`>>>群聊插入成功，code：${i}`)
      }
    })
  }
}

module.exports = {
  initSuperUser,
  initSystemUser,
  initAccountPool
}
