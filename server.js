const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const Blog = require('./models/Blog');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'plok',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

app.use((req, res, next) => {
    res.locals.isAuthenticated =req.session.user ? true : false;
    next();
});

app.use(require('./controllers/'));

function isLoggedIn (req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        const plainBlogs = blogs.map(blog => blog.get({ plain: true }));
        res.render('home', {
            blogs: plainBlogs
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        console.log(blogs);
        res.render('home', {
            blogs: blogs
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});