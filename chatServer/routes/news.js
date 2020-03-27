const express = require('express')
const Router = express.Router()
const newsController = require('./../controller/news')

Router.get('/recent', newsController.getRecentNews)
Router.post('/last', newsController.getLastNews)
Router.post('/isread', newsController.userIsReadMsg)

module.exports = Router
