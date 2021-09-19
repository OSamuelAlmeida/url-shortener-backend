const express = require('express')
const ShortURLController = require('../controllers/ShortURLController')

var router = express.Router()

router.get('/url/:code', ShortURLController.getShortURLByCode)
router.get('/top', ShortURLController.listTopShortURLs)
router.post('/create', ShortURLController.createShortURL)

module.exports = router