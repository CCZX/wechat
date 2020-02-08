const express = require('express')
const router = express.Router()
const pyqController = require('./../controller/pyqNews')

router.post('/publishpyqnews', pyqController.publishPyqNews)
router.get('/getfridenlypyq', pyqController.getMyFriendPyqNews)

module.exports = router
