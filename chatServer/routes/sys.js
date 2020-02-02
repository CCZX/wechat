const express = require('express')
const router = express.Router()
const sysUserController = require('./../controller/systemUser')

router.get('/sysusers', sysUserController.getSysUser)

module.exports = router
