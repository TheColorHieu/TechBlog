const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route to get all the comments
router.get('/', async (req, res) => {
    try{
        //fetching all comments from the database
        const commentData = await Comment.findAll();
        res.json(commentData);
    } catch (err) {
        //if an error occurs while fetching the comments, we will send the error message to the client
        console.log(err);
        res.status(500).json(err);
    }
});

//route to get one comment
router.get('/:id', async (req, res) => {
    try{
        //fetching one comment with the specified ID from the database
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData);
    } catch (err) {
        //if an error occurs while fetching the comment, we will send the error message to the client
        console.log(err);
        res.status(500).json(err);
    }
});
//route to create a comment
router.post('/', withAuth, async (req, res) => {
    try{
        if (req.session) {
            //creating a new comment in the database with the provided data
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            });
            res.json(commentData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//route to update a comment 
router.put('/:id', withAuth, async (req, res) => {
    try{
        const dbCommentData = await Comment.update({
            comment_text: req.body.comment_text,
    },
    {
        where: {
            id: req.params.id,
        },
    }
 );
if (!dbCommentData) {
    res.status(404).json({ message: 'No comment found with this id' });
    return;
}
res.json(dbCommentData);
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});

// Route to delete a comment by its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Delete the comment with the provided ID from the database
      const dbCommentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!dbCommentData) {
      
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
