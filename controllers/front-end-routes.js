const router = require('express').Router();

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error('Error rendering signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.error('Error rendering login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;