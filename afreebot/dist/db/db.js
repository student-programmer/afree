"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBase = exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'custdev', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});
exports.sequelize = sequelize;
class UserBase extends sequelize_1.Model {
}
exports.UserBase = UserBase;
UserBase.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client',
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    message_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    last_obj: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    chat_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
});
sequelize
    .sync()
    .then(() => {
    console.log('Model has been synchronized successfully.');
})
    .catch(error => {
    console.error('Error synchronizing model:', error);
});
