//here we are importing the sequelize model and datatypes from sequelize
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const { all } = require('../controllers');
//here we are extending the model class and initializing the post model
class Post extends Model {}
//create fields/columns for post model
Post.init(
    {
        //here we will be adding the id column
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        //here we will be adding the title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //here we will be adding the content column
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //here we will be adding the user id column
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);
//exporting the post model
module.exports = Post;