const express = require('express')
const router = express.Router()
const groupController = require('./../controller/group')

router.get('/getmygroup', groupController.getMyGroup)
router.get('/groupinfo', groupController.getGroupInfo)
router.get('/prefetchgroup', groupController.searchGroup)
router.post('/create', groupController.createGroup)
router.post('/recent', groupController.getRecentGroup)
router.get('/all', groupController.getAllGroup)

module.exports = router
