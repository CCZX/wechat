const express = require('express')
const router = express.Router()
const sysController = require('../controller/system')
const { uploadFile } = require('./../utils/upFile')

router.get('/sysusers', sysController.getSysUser) // 获取系统用户
router.get('/qiniutoken', sysController.getQiniuToken) // 七牛云token
router.get('/faceimg', sysController.readFaceImg)
router.get('/syssituation', sysController.getSysInfo)
/**上传文件接口，前端使用FormData来存储文件 */
router.post('/upfile', uploadFile.single('file'), sysController.uploadFile)

module.exports = router
