const {comment} = require('../models');
const commentData = [

];
const seedComments = () => comment.bulkCreate(commentData);
module.exports = seedComments;