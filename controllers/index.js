const router = require('express').Router();

const apiRoutes = require('./api');
const feRoutes = require('./front-end-routes.js');

router.use('/api', apiRoutes);
router.use('/', feRoutes);

module.exports = router;