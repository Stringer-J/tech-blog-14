const router = require('express').Router();

const blogRoutes = require('./blog-routes.js');

router.use('/api', blogRoutes);

module.exports = router;