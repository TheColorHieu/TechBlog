//here we are going to create the routes for the dashboard
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//function to get all the posts for the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
    //fetching all post created by current user
    const dbPostData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [ 'id', 'title', 'content', 'created_at' ],
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
                include: {
                    model: User,
                    attributes: [ 'username' ]
                },
            },
            {
                model: User,
                attributes: [ 'username' ]
            },
        ],
    });
    //convert the posts into an array of data
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    //render the dashboard template
    res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
    //if an error occurs while fetching the posts, we will send the error to the client
    console.log(err);
    res.status(500).json(err);            
    }
});

//function to edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        //fetching the post with the specified ID from the database
        const dbPostData = await Post.findByPk(req.params.id, {
        where: {
            id: req.params.id
    }, 
    attributes: [ 'id', 'title', 'content', 'created_at' ],
    include: [
        {
            model: User,
            attributes: [ 'username' ],
        },
        {
            model: Comment,
            attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
            include: {
                model: User,
                attributes: [ 'username' ]
            },
        },
    ],
});
//if the post is not found, we will send an error message to the client
if (!dbPostData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
}
//convert the post into an array of data
const post = dbPostData.get({ plain: true });
//render the edit-post template
res.render('edit-post', { post, loggedIn: true });
} catch (err) {
//if an error occurs while fetching the post, we will send the error to the client
console.log(err);
res.status(500).json(err);
}
});

//function to create a new post
router.get('/new', (req, res) => {
    //render the new-post template
    res.render('new-post');
});

module.exports = router;
