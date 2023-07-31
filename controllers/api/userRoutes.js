const router = require('express').Router();
const { User } = require('../../models');

// route to get api/users
router.get('/', async (req, res) => {
    try {
        //fetching all users from the database excluding the password
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to get api/users/:id
router.get('/:id', async (req, res) => {
    try {
        //fetching one user with the specified ID from the database excluding the password
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [ 
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at']
                },
                // include the Comment model here:
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// route to post api/users
router.post('/', async (req, res) => {
    try{
        //creating a new user in the database with the provided data
        console.log(req.body);
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        //saving the user data to the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// route to post api/users/login
router.post('/login', async (req, res) => {
    try{
    //find the user by their username in the database
    const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    //if the user is not found in the database
    if(!userData) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
    }
    //if the user is found in the database
    const validPassword = await userData.checkPassword(req.body.password);
    //if the password is not valid
    if(!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
    }
    //saving the user data to the session
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json({ user: userData, message: 'You are now logged in!' });
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// route to post api/users/logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            //destroy the session
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// route to put api/users/:id
router.put('/:id', async (req, res) => {
    try {
        //update the user data with the provided data
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
    }
        });
        if(!userData[0] ) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// route to delete api/users/:id
router.delete('/:id', async (req, res) => {
    try{
        //delete the user with the specified ID
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;

