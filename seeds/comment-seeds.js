// const {comment} = require('../models');
// const commentData = []
// const seedComments = () => comment.bulkCreate(commentData);
// module.exports = seedComments;
const { Comment } = require('../models');
const commentData = [];
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;
