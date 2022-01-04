const express = require('express')
const router = express.Router()
const { getUrl, registerUrl } = require('../controllers/shorts')

router.route('/').post(registerUrl)
router.route('/go/:hash').get(getUrl)

module.exports = router