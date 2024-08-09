const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Blog = require('../../models/Blog');

router.post('/signup', async (req, res) => {
    try {
        const { user_name, pass } = req.body;

        console.log('Request Body:', req.body);

        if (!user_name || !pass) {
            return res.status(400).json({ message: 'Email and password required'});
        }

        const existingUser = await User.findOne({ 
            where: {
                user_name: user_name
            } 
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const user = await User.create({ user_name, pass: hashedPassword });
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user', err});
    }
});

router.post('/login', async (req, res) => {
    console.log('Session before login:', req.session);
    try {
        const { user_name, pass } = req.body;
        if (!user_name || !pass) {
            return res.status(400).json({ success: false, message: 'Email and Password required'});
        }

        console.log('Request Body:', req.body);

        const user = await User.findOne({ 
            where: { 
                user_name: user_name
            }
        });

        console.log('Plain pass:', pass);
        console.log('User pass:', user.pass);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(pass, user.pass);
        console.log('Password match result:', isMatch);

        if (isMatch) {
            req.session.user = { id: user.id, user_name: user.user_name };
            console.log('Session user set:', req.session.user);
            return res.json({ success: true, message: 'Login Successful'});
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in', err});
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;