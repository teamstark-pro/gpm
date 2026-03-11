const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema(
    {
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FormTemplate',
            required: true,
        },
        submittedData: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'accepted', 'rejected'],
            default: 'pending',
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
