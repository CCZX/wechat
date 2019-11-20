// 上传文件的配置
const formatTime = require('./index').fromatTime
const randomName = require('./index').randomName
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let date = formatTime(new Date(), false)
    let path = './public/uploads'
    let pathDate = './public/uploads' + date
    let isExit = fs.existsSync(pathDate)
    if (!isExit) {
      fs.mkdirSync(path)
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
