const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Blog,
                key: 'posted',
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'b_user',
    }
);

module.exports = User;