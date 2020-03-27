const express = require('express')
const router = express.Router()
const pyqController = require('./../controller/pyqNews')
const pyqLikeController = require('./../controller/pyqLike')
const pyqCommentController = require('./../controller/pyqComment')

router.post('/publishpyqnews', pyqController.publishPyqNews)
router.get('/getfridenlypyq', pyqController.getMyFriendPyqNews) // 获取我的空间好友的朋友圈列表
router.post('/like', pyqLikeController.doLike)
router.post('/comment', pyqCommentController.doComment)
router.post('/deletepyq', pyqController.deletePyqItem)
router.get('/pyqinfo', pyqController.getPyqItemInfo)
router.post('/pyqmodify', pyqController.modifyPyqItem)
router.post('/getuserpyq', pyqController.getUserPyq) // 获取某个用户的欧元区

module.exports = router
