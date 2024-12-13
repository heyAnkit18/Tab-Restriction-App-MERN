const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const appRoutes = require('./routes/appRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRoutes);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/simultaneous_app';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


