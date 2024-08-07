const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const blogData = require('./seeds/blog-seeds.json');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.use(session({
    secret: 'plok',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

function isLoggedIn (req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

app.get('/', async (req, res) => {
    res.render('home', {
        blogs: blogData
    });
});

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});