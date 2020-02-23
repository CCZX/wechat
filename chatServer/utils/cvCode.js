// 生成验证码
const cvCodeList = require('./../const/index').cvCodeList

const cvCode = () => {
  const timestamp = Date.now()
  let code = ''
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * cvCodeList.length)
    code += cvCodeList[random]
  }
  return {code, timestamp}
}
module.exports = {
  cvCode
}
