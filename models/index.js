const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//user to blog
User.hasMany(Blog, { foreignKey: 'user_id'});
Blog.belongsTo(User, { foreignKey: 'user_id'});

//blog to comment
Blog.hasMany(Comment, { foreignKey: 'blog_id'});
Comment.belongsTo(Blog, { foreignKey: 'blog_id'});