const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//creating our user model
class User extends Model {
    //here we will be adding a method to check the password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
//now we define table columns and configuration
User.init(
    {
        //here we will be adding the id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //here we will be adding the username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        //here we will be adding the password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
        //our password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            //here we will be adding a beforeCreate hook to hash the password before the object is created
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        //setting up the beforeUpdate hook
        async beforeUpdate(updatedUserData) { 
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
        //here we will be adding the sequelize connection
        sequelize,
        //here we will be adding the timestamps
        timestamps: false,
        //here we will be adding the freezeTableName
        freezeTableName: true,
        //here we will be adding the underscored
        underscored: true,
        //here we will be adding the modelName
        modelName: 'user'
    });
//exporting the user model
module.exports = User;
