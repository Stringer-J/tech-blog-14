const router = require('express').Router();

const blogRoutes = require('./api/blog-routes.js');
const feRoutes = require('./front-end-routes.js');

router.use('/api', blogRoutes);
router.use('/', feRoutes);

module.exports = router;