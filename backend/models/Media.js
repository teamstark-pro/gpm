const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Image', 'Document', 'Video'],
            required: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Media', MediaSchema);
