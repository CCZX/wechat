const resolve = require('path').resolve
const fs = require('fs')
const qiniu = require('qiniu')
const OSUtils = require('os-utils')
const OS = require('os')
const SYS_USER = require('../models/systemUser')
const { ACCESS_KEY, SECRET_KEY, BUCKET } = require('./../utils/config')
const { formatDate } = require('./../utils')

/**系统用户 */
const getSysUser = async (req, res) => {
  try {
    const data = await SYS_USER.find()
    res.json({
      status: 2000,
      data,
      msg: '获取数据成功！'
    })
  } catch (error) {
    res.json({
      status: 2003,
      data: '',
      msg: '服务端错误，请稍后重试！'
    })
  }
}

/**七牛云token */
const getQiniuToken = (req, res) => {
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
  const options = {
    scope: BUCKET
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const token = putPolicy.uploadToken(mac)
  return res.json({
    status: 2000,
    data: token,
    msg: 'success'
  })
}

/**获取头像 */
const readFaceImg = (req, res) => {
  const facePath = resolve(__dirname, './../public/face')
  fs.readdir(facePath, (err, files) => {
    if (err) {
      return
    }
    // fs.stat()
    return res.json({
      status: 2000,
      data: files,
      msg: '成功！'
    })
  })
}

const uploadFile = (req, res) => {
  const date = formatDate(new Date(), false)
  return res.json({
    status: 2000,
    data: '/uploads/' + date + '/' + req.file.filename,
    msg: 'success'
  })
}

/**系统的状态，比如CPU使用，内存使用等 */
const getSysInfo = (req, res) => {
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
}

module.exports = {
  getSysUser,
  getQiniuToken,
  readFaceImg,
  uploadFile,
  getSysInfo
}
