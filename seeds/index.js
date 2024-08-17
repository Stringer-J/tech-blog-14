const sequelize = require('../config/connection.js');
const { User, Blog, Comment } = require('../models/index.js');

sequelize.sync({ force: true });