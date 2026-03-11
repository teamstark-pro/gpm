const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

// We will add controllers and multer later

router.get('/', (req, res) => res.json({ message: 'Get all media' }));
router.post('/upload', protect, admin, (req, res) => res.json({ message: 'Upload media' }));

module.exports = router;
