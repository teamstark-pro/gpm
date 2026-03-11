const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    // singleton – always use _id: 'global'
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
