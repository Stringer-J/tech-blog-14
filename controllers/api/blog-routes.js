const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const Comment = require('../../models/Comment');

router.post('/signup', async (req, res) => {
    try {
        const { user_name, pass } = req.body;

        // console.log('Request Body:', req.body);

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
    // console.log('Session before login:', req.session);
    try {
        const { user_name, pass } = req.body;
        if (!user_name || !pass) {
            return res.status(400).json({ success: false, message: 'Email and Password required'});
        }

        // console.log('Request Body:', req.body);

        const user = await User.findOne({ 
            where: { 
                user_name: user_name
            }
        });

        // console.log('Plain pass:', pass);
        // console.log('User pass:', user.pass);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(pass, user.pass);
        // console.log('Password match result:', isMatch);

        if (isMatch) {
            req.session.user = { id: user.id, user_name: user.user_name };
            // console.log('Session user set:', req.session.user);
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

router.get('/getUser', (req, res) => {
    // console.log('getUser route worked');
    const userName = req.session.user.user_name;
    // console.log(userName);
    res.json({ user_name: userName });
});

router.post('/postBlog', async (req, res) => {
    try {
        const { title, content } = req.body;

        // console.log(req.body);

        if (!title || !content) {
            return res.status(400).json({ message: 'All fields required'});
        }

        const user_name = req.session.user.user_name;

        // console.log('Selected User Name:', user_name);

        const user = await User.findOne({
            where: { user_name: user_name}
        });

        // console.log('Selected User:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user.id;

        // console.log('Selected User ID:', userId);

        const blog = await Blog.create({ 
            title,
            posted: user_name,
            content,
            user_id: userId,
        });
        res.status(201).json({ message: 'Blog Created', blog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating blog post', err});
    }
});

router.post('/updateBlog/:id', async (req, res) => {
    console.log('THE CODE IS FINDING THE ROUTE AT LEAST / updateBlog/:id');
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        console.log('The Body of the Input:', req.body);

        if (!title || !content) {
            return res.status(400).json({ message: 'All fields required'});
        }

        const user_name = req.session.user.user_name;

        // console.log('Selected User Name:', user_name);

        const user = await User.findOne({
            where: { user_name: user_name}
        });

        // console.log('Selected User:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user.id;

        // console.log('Selected User ID:', userId);

        const blog = await Blog.findOne({ 
            where: { id: id, user_id: userId}
        });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found'});
        }

        blog.title = title;
        blog.content = content;
        await blog.save();

        res.status(201).json({ message: 'Blog Updated', blog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating blog post', err});
    }
});

router.delete('/deleteBlog/:id', async (req, res) => {
    console.log('DELETE request received for ID:', req.params.id);
    try {
        const { id } = req.params;
        const result = await Blog.destroy({
            where: { id: id }
        });

        if (!result) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog Deleted'});
    } catch (error) {
        console.error('Could not Delete:', error);
        res.status(500).json({ message: 'Error'});
    }
});

router.post('/addComment/:id', async (req, res) => {
    try{
        const { commenter, comment, blog_id } = req.body;

        console.log('The Body:', req.body);

        if (!commenter || !comment) {
            return res.status(400).json({ message: "All fields required"})
        }

        const addedComment = await Comment.create({ commenter, comment, blog_id});
        res.status(201).json({ message: 'Comment Added', addedComment});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding Comment', err});
    }
});

module.exports = router;