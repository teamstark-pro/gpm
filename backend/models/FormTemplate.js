const mongoose = require('mongoose');

const FormTemplateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        fields: [
            {
                type: {
                    type: String,
                    enum: ['text', 'textarea', 'email', 'number', 'date', 'dropdown', 'checkbox', 'radio', 'file'],
                    required: true,
                },
                label: {
                    type: String,
                    required: true,
                },
                required: {
                    type: Boolean,
                    default: false,
                },
                options: [String], // for dropdown, checkbox, radio
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        deadline: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FormTemplate', FormTemplateSchema);
