const {User} = require('../models');

const userData = [
    {
        username: 'hieu',
        password: 'password123'
    },
    {
        username: 'hieu1',
        password: 'password123'
    },
    {
        username: 'hieu2',
        password: 'password123'
    },

];
const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;
