const express = require('express')
const router = express.Router()
const friendlyController = require('./../controller/friendly')

router.get('/myfriends', friendlyController.getMyFriends)

module.exports = router
