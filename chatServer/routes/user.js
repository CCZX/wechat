const express = require('express')
const router = express.Router()
const userController = require('./../controller/user')

router.post('/login', userController.login) // 登录
router.get('/getcode', userController.generatorCode) // 验证码
router.post('/register', userController.register) // 注册
router.get('/userinfo', userController.getUserInfo) // 获取用户信息
router.get('/prefetchuser', userController.preFetchUser) // 搜索获取用户
router.get('/getalluser', userController.getAllUser) // 获取所有用户
router.get('/getuserbysigntime', userController.getUserBySignUpTime) // 根据注册时间获取用户
router.post('/changestatus', userController.changeUserStatus) // 改变用户状态
router.post('/addfenzu', userController.addNewFenzu) // 添加分组
router.post('/modifyuserfenzu', userController.modifyFrienFenzu) // 更新好友的分组
router.post('/delfenzu', userController.deleteFenzu) // 删除分组
router.post('/editfenzu', userController.editFenzu) // 编辑某项分组的名称
router.post('/modifyfriendbeizhu', userController.modifyBeizhu) // 修改好友备注
router.post('/updateUserInfo', userController.updateUserInfo) // 更新用户信息
router.post('/updateUserPwd', userController.updateUserPwd) // 更新用户密码

module.exports = router
