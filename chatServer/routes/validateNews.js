const express = require('express')
const router = express.Router()
const validateNewsController = require('./../controller/validateNews')

router.get('/myvalidatenews', validateNewsController.findMyValidateNews)

module.exports = router
