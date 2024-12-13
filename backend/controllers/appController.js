const { logActivity } = require('./auditController');
let applications = [
  { "id": "5eaa781456b9935e0b4fbc93", "app_name": "ORBIN" },
  { "id": "5eaa781424060409687ba049", "app_name": "ZILCH" },
  { "id": "5eaa7814ac87f820fa6fcce1", "app_name": "ZOXY" },
  { "id": "5eaa7814d19b4a7ec4ba5c49", "app_name": "SUPPORTAL" },
  { "id": "5eaa781483c7bc55a431f217", "app_name": "GONKLE" },
  { "id": "5eaa7814a9407212d5c74d8d", "app_name": "ZENTILITY" },
  { "id": "5eaa7814af7ae3086119c7dc", "app_name": "OBLIQ" },
  { "id": "5eaa7814a9f8e085c1055f86", "app_name": "APPLICA" },
  { "id": "5eaa781408f38cbe5745d37f", "app_name": "LUNCHPAD" },
  { "id": "5eaa78144bc1d00fa1f0598c", "app_name": "SOLGAN" }
];

// Fetch applications
exports.getApplications = async (req, res) => {
  const userId = req.headers['x-user-id'] || 'Unknown User';
  try {
    await logActivity(userId, 'Fetch Applications', 'User fetched the application list');
    res.status(200).json({
      status: 'success',
      data: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Handle application selection
exports.handleApplicationSelection = async (req, res) => {
  const { userId, appId } = req.body;
  try {
    const app = applications.find((a) => a.id === appId);

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found',
      });
    }

    await logActivity(userId, 'Application Selection', `Selected application: ${app.app_name}`);
    res.status(200).json({
      status: 'success',
      message: 'Application selected',
      data: app,
    });
  } catch (error) {
    console.error('Error selecting application:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};




