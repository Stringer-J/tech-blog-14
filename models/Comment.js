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
        commenter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Blog,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'comment',
    }
);

module.exports = Comment;