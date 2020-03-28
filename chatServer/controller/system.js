const resolve = require('path').resolve
const fs = require('fs')
const qiniu = require('qiniu')
const SYS_USER = require('../models/systemUser')
const { ACCESS_KEY, SECRET_KEY, BUCKET } = require('./../utils/config')

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

module.exports = {
  getSysUser,
  getQiniuToken,
  readFaceImg
}
