const express = require('express')
const { handleSubscribe } = require('../controllers/subscribeController')
const router = express.Router()

router.post('/', handleSubscribe)
module.exports = router