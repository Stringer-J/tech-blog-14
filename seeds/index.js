const sequelize = require('../config/connection.js');
const { User, Blog, Comment } = require('../models/index.js');

//needed to actually initialize the database
sequelize.sync({ force: true });