const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const SiteSettings = require('../models/SiteSettings');

// @desc  Get site settings (public)
// @route GET /api/settings
router.get('/', async (req, res) => {
    try {
        let settings = await SiteSettings.findOne({});
        if (!settings) {
            settings = await SiteSettings.create({});
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// @desc  Update site settings (admin)
// @route PUT /api/settings
router.put('/', protect, admin, async (req, res) => {
    try {
        const { facebook, twitter, instagram, linkedin } = req.body;
        let settings = await SiteSettings.findOne({});
        if (!settings) {
            settings = new SiteSettings({});
        }
        if (facebook !== undefined) settings.facebook = facebook;
        if (twitter !== undefined) settings.twitter = twitter;
        if (instagram !== undefined) settings.instagram = instagram;
        if (linkedin !== undefined) settings.linkedin = linkedin;
        const updated = await settings.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
