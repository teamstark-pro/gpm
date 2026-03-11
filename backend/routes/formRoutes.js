const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
    getFormTemplates,
    getAdminFormTemplates,
    createFormTemplate,
    getFormTemplateById,
    updateFormTemplate,
    deleteFormTemplate,
    submitForm,
    getSubmissions,
    updateSubmissionStatus
} = require('../controllers/formController');

// Templates configuration
router.get('/templates', getFormTemplates);
router.get('/admin/templates', protect, admin, getAdminFormTemplates);
router.post('/templates', protect, admin, createFormTemplate);
router.get('/templates/:id', getFormTemplateById);
router.put('/templates/:id', protect, admin, updateFormTemplate);
router.delete('/templates/:id', protect, admin, deleteFormTemplate);

// Submissions
router.get('/submissions', protect, admin, getSubmissions);
router.post('/submit/:templateId', submitForm);
router.put('/submissions/:id/status', protect, admin, updateSubmissionStatus);

module.exports = router;
