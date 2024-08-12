const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Blog,
                key: 'id',
            },
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'comment',
    }
);

// Blog.hasMany(Comment, { foreignKey: 'blog_id'});
// Comment.belongsTo(Blog, { foreignKey: 'blog_id'});

// module.exports = Comment;