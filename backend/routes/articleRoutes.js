const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

// We will add controllers later

router.get('/', (req, res) => res.json({ message: 'Get all articles' }));
router.post('/', protect, admin, (req, res) => res.json({ message: 'Create article' }));

module.exports = router;
