const dbConnect = require('../config/connection.js');
const { User, Blog, Comment } = require('../models/index.js');

await dbConnect.sync({ force: true });