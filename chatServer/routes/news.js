const express = require('express')
const Router = express.Router()
const newsController = require('./../controller/news')

Router.get('/recent', newsController.getRecentNews)
Router.post('/last', newsController.getLastNews)

module.exports = Router
