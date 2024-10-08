const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Blog = require('./models/Blog');
const User = require('./models/User');
const Comment = require('./models/Comment');
const moment = require('moment');

const sequelize = require('./config/connection');

require('./models');

const sessionStore = new SequelizeStore({
    db: sequelize
});

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: sessionStore,
    secret: 'plok',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 20
    }
}));

//lets me check if the user is actually logged in or not
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false;
    res.locals.user = req.session.user;
    next();
});

app.use(require('./controllers/'));

//maybe double dipping with isAuthenticated from above, but I didn't want to remove it just in case
function isLoggedIn (req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [ //lets me find the user name to pass to handelbars
                {
                    model: User,
                    as: 'author',
                    attributes: ['user_name']
                }
            ]
        });
        const comments = await Comment.findAll();

        //makes the blogs and comments plain
        const plainBlogs = blogs.map(blog => blog.get({ plain: true}));
        const plainComments = comments.map(comment => comment.get({ plain: true}));

        //maps all the formatted blogs and comments
        const blogsWithComments = plainBlogs.map(blog => {
            //formats the date with moment
            const formattedDate = moment(blog.date).format('MM-DD-YY hh:mm');
            return {
                ...blog,
                date: formattedDate,
                comments: plainComments.filter(comment => comment.blog_id === blog.id)
            };
        });

        console.log(JSON.stringify(blogsWithComments, null, 2));
        
        res.render('home', {
            blogs: blogsWithComments,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const user_name = req.session.user.user_name;
        const user = await User.findOne({
            where: { user_name: user_name }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const user_id = user.id;

        const blogs = await Blog.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['user_name']
                }
            ]
        });
        const comments = await Comment.findAll();

        const plainBlogs = blogs.map(blog => blog.get({ plain: true }));
        const plainComments = comments.map(comment => comment.get({ plain: true}));

        const blogsWithComments = plainBlogs.map(blog => {
            const formattedDate = moment(blog.date).format('MM-DD-YY hh:mm');
            return {
                ...blog,
                date: formattedDate,
                comments: plainComments.filter(comment => comment.blog_id === blog.id)
            };
        });

        res.render('dashboard', {
            blogs: blogsWithComments,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

try {
    sequelize.sync({ force: false }).then(() => {
        app.listen(PORT, () => console.log('Now listening'));
    })
} catch (err) {
    console.error(err);
}

