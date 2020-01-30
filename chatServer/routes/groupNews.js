const express = require('express')
const Router = express.Router()
const groupNewsController = require('./../controller/groupNews')

Router.get('/recentnews', groupNewsController.getRecentGroupNews)

module.exports = Router
