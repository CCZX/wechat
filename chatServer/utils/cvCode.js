// 生成验证码
const cvCodeList = require('./../const/index').cvCodeList

const cvCode = () => {
  let res = ''
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * cvCodeList.length)
    res += cvCodeList[random]
  }
  return res
}
module.exports = {
  cvCode
}
