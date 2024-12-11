const express = require('express');
const { getApplications, handleAudit } = require('../controllers/appController');

const router = express.Router();

// Routes
router.get('/applications', getApplications);
router.post('/audit', handleAudit);

module.exports = router;
