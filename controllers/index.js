//here we are setting up the routes for the application
const router = require('express').Router();
const apiRoutes = require('../controllers/api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashBoardRoutes.js');
// const userRoutes = require('./api/userRoutes');

// router.use('/users', userRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
