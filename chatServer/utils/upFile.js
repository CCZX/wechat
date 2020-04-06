// 上传文件的配置
const formatTime = require('./index').fromatTime
const randomName = require('./index').randomName
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  /**设置上传路径，跨可以使用函数或者字符串来设置 */
  destination(req, file, cb) {
    const date = formatTime(new Date(), false)
    const path = './public/uploads'
    const isExitPath = fs.existsSync(path)
    const pathDate = './public/uploads/' + date
    const isExitPathDate = fs.existsSync(pathDate)
    console.log(isExitPath, isExitPathDate)
    if (!isExitPath) {
      console.log('do ./public/uploads')
      fs.mkdirSync(path)
    }
    if (!isExitPathDate) {
      fs.mkdirSync(pathDate)
    }
    cb(null, pathDate)
  },
  // 重命名文件
  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + randomName() + '-' + file.originalname)
  }
})

const uploadFile = multer({
  storage
})

module.exports = {
  uploadFile
}
