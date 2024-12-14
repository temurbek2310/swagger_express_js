const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING
    }
})

module.exports = Product