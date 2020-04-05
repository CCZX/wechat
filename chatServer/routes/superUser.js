const express = require('express')
const router = express.Router()
const superUserController = require('./../controller/superUser')

router.post('/login', superUserController.login)

module.exports = router
