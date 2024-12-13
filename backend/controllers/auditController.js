const AuditLog = require('../models/auditModel');


const logActivity = async (userId, action, details = '') => {
  try {
    const newLog = new AuditLog({ userId, action, details });
    await newLog.save();
    console.log(`Audit log created: ${action}`);
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
};

module.exports = { logActivity }; 
