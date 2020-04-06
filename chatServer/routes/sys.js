const express = require('express')
const router = express.Router()
const OSUtils = require('os-utils')
const OS = require('os')
const sysController = require('../controller/system')
const { uploadFile } = require('./../utils/upFile')
const formatTime = require('./../utils').fromatTime

router.get('/sysusers', sysController.getSysUser) // 获取系统用户
router.get('/qiniutoken', sysController.getQiniuToken) // 七牛云token
router.get('/faceimg', sysController.readFaceImg)
router.get('/syssituation', (req, res) => {
  let freeMem = OS.freemem() / 1024 / 1024 / 1024
  let totalMem = OS.totalmem() / 1024 / 1024 / 1024
  OSUtils.cpuUsage((val) => {
    let curCPU = val
    const data = {
      cpuUsage: ( curCPU * 10 ).toFixed(2),
      freeMem: freeMem.toFixed(2) + "G",
      totalMem: totalMem.toFixed(2) + "G",
      usedMem: (totalMem - freeMem).toFixed(2) + "G",
      MemUsage: ( (totalMem - freeMem)/totalMem * 10 ).toFixed(2),
    }
    return res.json({
      status: 2000,
      data,
      msg: 'Success'
    })
  })
})
/**上传文件接口，前端使用FormData来存储文件 */
router.post('/upfile', uploadFile.single('file'), (req, res) => {
  const date = formatTime(new Date(), false)
  return res.json({
    status: 2000,
    data: '/uploads/' + date + '/' + req.file.filename,
    msg: 'success'
  })
})

module.exports = router
