const { Sequelize } = require('sequelize');


// SQLite database configuration
const sequelize = new Sequelize ({
    dialect : 'sqlite',
    storage : './database/database.sqlite'
})

module.exports = sequelize;