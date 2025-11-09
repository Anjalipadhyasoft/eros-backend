const express = require('express');
const router = express.Router();
const { saveEnquiry, submitEnquiry } = require('../controllers/enquiryController');
const checkDbConnection = require('../middleware/dbCheck');

// Route to save enquiry to database only (no emails)
router.post('/save-enquiry', checkDbConnection, saveEnquiry);

// Main route to handle enquiry submission with database save and email notifications
router.post('/send-enquiry', checkDbConnection, submitEnquiry);

module.exports = router;
