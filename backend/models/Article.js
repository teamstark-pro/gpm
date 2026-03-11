const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['News', 'Event'],
            required: true,
        },
        coverImage: {
            type: String,
            default: '',
        },
        eventDate: {
            type: Date, // Only relevant if type is 'Event'
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Article', ArticleSchema);
