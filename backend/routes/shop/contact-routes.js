const express = require('express');
const { sendEmail } = require('../../controllers/shop/contact-controller');

const router = express.Router();

// POST route for sending emails
router.post('/send-email', sendEmail);

module.exports = router;
