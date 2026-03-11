const Page = require('../models/Page');

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public (only published pages) or Private/Admin (all pages)
exports.getPages = async (req, res) => {
    try {
        let query = {};

        // If user is not authenticated or not admin, only show published pages
        if (!req.user || req.user.role !== 'admin') {
            query.status = 'published';
        }

        const pages = await Page.find(query).sort({ createdAt: -1 });

        res.status(200).json(pages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching pages.' });
    }
};

// @desc    Get page by slug
// @route   GET /api/pages/:slug
// @access  Public
exports.getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });

        if (!page) {
            return res.status(404).json({ message: 'Page not found.' });
        }

        // If page is a draft, only admins can view it
        if (page.status === 'draft') {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to view this page.' });
            }
        }

        res.status(200).json(page);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching the page.' });
    }
};

// @desc    Create a page
// @route   POST /api/pages
// @access  Private/Admin
exports.createPage = async (req, res) => {
    try {
        const { title, slug, content, status, seo } = req.body;

        // Ensure slug is unique
        const existingPage = await Page.findOne({ slug });
        if (existingPage) {
            return res.status(400).json({ message: 'A page with this slug already exists.' });
        }

        const newPage = await Page.create({
            title,
            slug,
            content,
            status,
            seo,
            author: req.user._id
        });

        res.status(201).json(newPage);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const valErrors = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: valErrors.join(', ') });
        }
        res.status(500).json({ message: 'Server error while creating the page.' });
    }
};

// @desc    Update a page
// @route   PUT /api/pages/:id
// @access  Private/Admin
exports.updatePage = async (req, res) => {
    try {
        const { title, slug, content, status, seo } = req.body;

        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found.' });
        }

        // Check if slug is being updated to an existing slug
        if (slug && slug !== page.slug) {
            const existingPage = await Page.findOne({ slug });
            if (existingPage) {
                return res.status(400).json({ message: 'A page with this slug already exists.' });
            }
        }

        page.title = title || page.title;
        page.slug = slug || page.slug;
        page.content = content || page.content;
        page.status = status || page.status;
        page.seo = seo || page.seo;

        await page.save();

        res.status(200).json(page);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating the page.' });
    }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
exports.deletePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found.' });
        }

        await page.deleteOne();

        res.status(200).json({ message: 'Page removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting the page.' });
    }
};
