const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
// const Comment = require('./Comment');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posted: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'user_name',
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'blog',
    }
);

User.hasMany(Blog, { foreignKey: 'user_id'});
Blog.belongsTo(User, { foreignKey: 'user_id'});

// Blog.hasMany(Comment, { foreignKey: 'blog_id'});
// Comment.belongsTo(Blog, { foreignKey: 'blog_id'});

module.exports = Blog;