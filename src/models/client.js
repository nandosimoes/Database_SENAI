const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Client = sequelize.define('client', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Client;
