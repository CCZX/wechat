const express = require('express')
const router = express.Router()
const userController = require('./../controller/user')

router.post('/login', userController.login)
router.get('/getcode', userController.generatorCode)
router.post('/register', userController.register)
router.get('/userinfo', userController.getUserInfo)
router.get('/prefetchuser', userController.preFetchUser)
router.get('/getalluser', userController.getAllUser)
router.get('/getuserbysigntime', userController.getUserBySignUpTime)

module.exports = router
