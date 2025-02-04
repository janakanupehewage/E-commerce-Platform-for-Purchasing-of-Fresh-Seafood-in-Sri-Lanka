const express = require('express');
const router = express.Router();
const {calculateNutrients} = require('../../controllers/shop/nutrients-controller');

router.post('/calculate-nutrients', calculateNutrients);

module.exports = router;
