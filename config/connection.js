//first we will be importing the mysql 
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//we will be adding the jawsdb to our server
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    //we will be adding the local host to our server
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}
//we will be exporting the sequelize
module.exports = sequelize;
//test