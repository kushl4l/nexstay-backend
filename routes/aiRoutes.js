const express = require('express');
const router = express.Router();
const { getRecommendations, predictPrice } = require('../controllers/aiController');

router.post('/recommendations', getRecommendations);
router.post('/price-predict', predictPrice);

module.exports = router;
