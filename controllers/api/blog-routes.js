const router = require('express').Router();
const User = require('../../models/User');
const Blog = require('../../models/Blog');

router.post('/signup', async (req, res) => {
    try {
        const { user_name, pass } = req.body;

        const user = await User.create({ user_name, pass });
        res.status(201).json({ message: 'User created', user });
        // res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user', err});
    }
});

module.exports = router;