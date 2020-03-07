const express = require('express')
const router = express.Router()
const friendlyController = require('./../controller/friendly')

router.get('/myfriends', friendlyController.getMyFriends)
router.post('/recentconversation', friendlyController.getRecentConversation)

module.exports = router
