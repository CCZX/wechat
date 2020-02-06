const express = require('express')
const router = express.Router()
const qiniu = require('qiniu')
const OSUtils = require('os-utils')
const OS = require('os')
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

module.exports = router
