const express = require('express')
const router = express.Router()
const pyqController = require('./../controller/pyqNews')
const pyqLikeController = require('./../controller/pyqLike')
const pyqCommentController = require('./../controller/pyqComment')

router.post('/publishpyqnews', pyqController.publishPyqNews)
router.get('/getfridenlypyq', pyqController.getMyFriendPyqNews)
router.post('/like', pyqLikeController.doLike)
router.post('/comment', pyqCommentController.doComment)
router.post('/deletepyq', pyqController.deletePyqItem)

module.exports = router
