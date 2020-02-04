const express = require('express')
const router = express.Router()
const qiniu = require('qiniu')
const { ACCESS_KEY, SECRET_KEY, BUCKET } = require('./../utils/config')
const sysUserController = require('./../controller/systemUser')

router.get('/sysusers', sysUserController.getSysUser)

router.get('/qiniutoken', async (req, res) => {
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
  const options = {
    scope: BUCKET
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const token = putPolicy.uploadToken(mac)
  res.json({
    status: 2000,
    data: token,
    msg: 'success'
  })
})

module.exports = router
