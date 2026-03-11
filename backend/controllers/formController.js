const FormTemplate = require('../models/FormTemplate');
const FormSubmission = require('../models/FormSubmission');

// @desc    Get all active form templates
// @route   GET /api/forms/templates
// @access  Public
const getFormTemplates = async (req, res) => {
    try {
        const templates = await FormTemplate.find({ isActive: true });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get admin form templates (active and inactive)
// @route   GET /api/forms/admin/templates
// @access  Private/Admin
const getAdminFormTemplates = async (req, res) => {
    try {
        const templates = await FormTemplate.find({}).sort({ createdAt: -1 });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new form template
// @route   POST /api/forms/templates
// @access  Private/Admin
const createFormTemplate = async (req, res) => {
    try {
        const { title, description, fields, isActive, deadline } = req.body;

        const template = new FormTemplate({
            title,
            description,
            fields,
            isActive,
            deadline,
        });

        const createdTemplate = await template.save();
        res.status(201).json(createdTemplate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get a single form template by ID
// @route   GET /api/forms/templates/:id
// @access  Public
const getFormTemplateById = async (req, res) => {
    try {
        const template = await FormTemplate.findById(req.params.id);

        if (template) {
            res.json(template);
        } else {
            res.status(404).json({ message: 'Form template not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a form template
// @route   PUT /api/forms/templates/:id
// @access  Private/Admin
const updateFormTemplate = async (req, res) => {
    try {
        const { title, description, fields, isActive, deadline } = req.body;

        const template = await FormTemplate.findById(req.params.id);

        if (template) {
            template.title = title !== undefined ? title : template.title;
            template.description = description !== undefined ? description : template.description;
            template.fields = fields !== undefined ? fields : template.fields;
            template.isActive = isActive !== undefined ? isActive : template.isActive;
            template.deadline = deadline !== undefined ? deadline : template.deadline;

            const updatedTemplate = await template.save();
            res.json(updatedTemplate);
        } else {
            res.status(404).json({ message: 'Form template not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a form template
// @route   DELETE /api/forms/templates/:id
// @access  Private/Admin
const deleteFormTemplate = async (req, res) => {
    try {
        const template = await FormTemplate.findByIdAndDelete(req.params.id);

        if (template) {
            await FormSubmission.deleteMany({ formId: req.params.id });
            res.json({ message: 'Form template removed' });
        } else {
            res.status(404).json({ message: 'Form template not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Submit a form
// @route   POST /api/forms/submit/:templateId
// @access  Public
const submitForm = async (req, res) => {
    try {
        const templateId = req.params.templateId;
        const { submittedData } = req.body;

        const template = await FormTemplate.findById(templateId);

        if (!template || !template.isActive) {
            return res.status(400).json({ message: 'Form is not active or not found' });
        }

        if (template.deadline && new Date() > new Date(template.deadline)) {
            return res.status(400).json({ message: 'Form deadline has passed' });
        }

        const submission = new FormSubmission({
            formId: templateId,
            submittedData,
        });

        const createdSubmission = await submission.save();

        // In a real application, send an email notification here.

        res.status(201).json(createdSubmission);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all submissions (optionally filtered by formId)
// @route   GET /api/forms/submissions
// @access  Private/Admin
const getSubmissions = async (req, res) => {
    try {
        const { formId } = req.query;
        let query = {};

        if (formId) {
            query.formId = formId;
        }

        const submissions = await FormSubmission.find(query)
            .populate('formId', 'title')
            .sort({ submittedAt: -1 });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update submission status
// @route   PUT /api/forms/submissions/:id/status
// @access  Private/Admin
const updateSubmissionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const submission = await FormSubmission.findById(req.params.id);

        if (submission) {
            submission.status = status;
            const updatedSubmission = await submission.save();
            res.json(updatedSubmission);
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getFormTemplates,
    getAdminFormTemplates,
    createFormTemplate,
    getFormTemplateById,
    updateFormTemplate,
    deleteFormTemplate,
    submitForm,
    getSubmissions,
    updateSubmissionStatus
};
