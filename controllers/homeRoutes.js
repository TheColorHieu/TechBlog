//here we are setting up the different routes for the application
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//here we are getting all the posts for the homepage
//we are creating a function that will get all the posts for the homepage
router.get('/', async (req, res) => {
    try {
        //here we are fecthing all the posts from the database and we are including the user and the comment data
        const dbPostData = await Post.findAll({
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
        //here we are converting the posts into a an array of data
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        //here we are rendering the homepage
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        //if we have an error while fetching the posts we will be sending the error
        console.log(err);
        res.status(500).json(err);
    }
});

//here we are creating the function to show the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        //if the user is already logged in we will be redirecting the user to the homepage
        res.redirect('/');
        return;
    }
    //if the user is not logged in we will be rendering the login page
    res.render('login');
});

//our next functjion will be to show the signup page
router.get('/signup', (req, res) => {
    //we will be rendering the signup page for an account 
    res.render('signup');
});

//here we are creating the function to show the single post page
router.get('/post/:id', async (req, res) => {
    try{
        //we are fetching a specific post witht hte provided ID from the database
        const dbPostData = await Post.findByPk(req.params.id, {
            where: {
                id: req.params.id
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
        //if we do not have a post with the provided ID we will be sending an error
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
            //we are converting the post into an array of data
            const post = dbPostData.get({ plain: true });
            //we are rendering the single post page
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        //if we have an error while fetching the post we will be sending the error
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;