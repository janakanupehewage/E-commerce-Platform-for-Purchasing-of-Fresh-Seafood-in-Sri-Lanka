const express = require('express');
const { getDashboardStats } = require('../../controllers/admin/admin-controller');

const router = express.Router();

// Dashboard stats route
router.get('/stats', getDashboardStats);

module.exports = router;
