const express = require('express')
const router = express.Router()
const { calculateRewards } = require('../controllers/donationController')

router.get('/calculate-rewards', calculateRewards)

module.exports = router