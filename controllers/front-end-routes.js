const router = require('express').Router();

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard');
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;