const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

//route to get all users
router.get('/', async (req, res) => {
    try {
        //fetching all users from the database excluding the password
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(userData);
    } catch (err) {
        //if an error occurs while fetching the users, we will send the error message to the client
        console.log(err);
        res.status(500).json(err);
    }
    });

//route to get one user
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
//route to create a user
router.post('/', async (req, res) => {
try{
    //creating a new user in the database with the provided data
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password
    });
    //we will be adding the user to the session
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

//route to login a user
router.post('/login', async (req, res) => {
    try {
        //find a user by their username in the database
        const userData = await User.findOne({
            where: {
                username: req.body.username
    }
});
if(!userData) {
    res.status(400).json({ message: 'No user with that username!' });
    return;
}
//we will be verifying the user's password
const validPassword = await userData.checkPassword(req.body.password);
if(!validPassword) {
    res.status(400).json({ message: 'Incorrect password!' });
    return;
}
//we will be adding the user to the session
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
//route to logout a user
router.post('/logout', (req, res) => {
    try {
        if(req.session.loggedIn) {
            //we will be destroying the session and log the user out
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
//route to update a user
router.put('/:id', async (req, res) => {
    try {
      // Update the user with the provided ID in the database
      const dbUserData = await User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      });
  
      if (!dbUserData[0]) {
        // If no rows were affected (user not found), send a 404 not found response
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
  
      res.json(dbUserData);
    } catch (err) {
      // If there's an error, log it and send a 500 server error response
      console.log(err);
      res.status(500).json(err);
    }
  });
//route to delete a user
router.delete('/:id', async (req, res) => {
    try {
        // Delete the user with the provided ID from the database
        const dbUserData = await User.destroy({
          where: {
            id: req.params.id
          }
        });
    
        if (!dbUserData) {
          // If no rows were affected (user not found), send a 404 not found response
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
    
        res.json(dbUserData);
      } catch (err) {
        // If there's an error, log it and send a 500 server error response
        console.log(err);
        res.status(500).json(err);
      }
    });
    
    module.exports = router;
  