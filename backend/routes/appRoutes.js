const express = require('express');
const { getApplications, handleApplicationSelection } = require('../controllers/appController'); 
const { logActivity } = require('../controllers/auditController'); 

const router = express.Router();


router.get('/applications', getApplications);


router.post('/application/select', handleApplicationSelection);

router.post('/log', async (req, res) => {
  const { userId, action, details } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await logActivity(userId, action, details);
    res.status(201).json({ message: 'Activity logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log activity' });
  }
});

module.exports = router;
