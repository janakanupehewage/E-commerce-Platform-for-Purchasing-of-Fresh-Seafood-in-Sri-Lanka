const express = require('express');
const router = express.Router();
//const adminController = require('../../controllers/admin/nutrients-controller');
const { addSeafood, getAllSeafood, updateSeafood } = require("../../controllers/admin/nutrients-controller");

router.post('/add', addSeafood);
router.get('/', getAllSeafood);
router.put('/update/:id', updateSeafood);

module.exports = router;
