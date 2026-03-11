const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Route files
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const formRoutes = require('./routes/formRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const pageRoutes = require('./routes/pageRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Website API' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/settings', settingsRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
