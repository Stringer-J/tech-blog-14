const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

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
        // posted: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     references: {
        //         model: User,
        //         key: 'user_name',
        //     },
        // },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

module.exports = Blog;