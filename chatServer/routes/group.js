const express = require('express')
const router = express.Router()
const groupController = require('./../controller/group')

router.get('/getmygroup', groupController.getMyGroup)
router.get('/groupinfo', groupController.getGroupInfo)

module.exports = router
