const express = require('express');
const { getApplications, handleAudit } = require('../controllers/auditController');


const router = express.Router();

// Routes
router.get('/applications', auditController.getApplications);
router.post('/audit', appController.handleAudit);

module.exports = router;
