const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

const {
    getPages,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage
} = require('../controllers/pageController');

// For public access, we don't want to strictly require auth on get routes
// We will conditionally check `req.user` inside the controller
const getOptionalUser = (req, res, next) => {
    // Attempt to verify token silently, but don't fail if not present
    // Just pass to the controller
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        protect(req, res, (err) => {
            next();
        });
    } else {
        next();
    }
};

router.route('/')
    .get(getOptionalUser, getPages)
    .post(protect, admin, createPage);

router.route('/:id')
    .put(protect, admin, updatePage)
    .delete(protect, admin, deletePage);

router.route('/slug/:slug')
    .get(getOptionalUser, getPageBySlug);

module.exports = router;
