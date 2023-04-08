const { registerUser, loginUser, getMe } = require('../controllers/usersController');
const { protect } = require('../middlewares/authMiddleware');

const usersRoute = require('express').Router();

usersRoute
    .route('/register')
    .post(registerUser);

usersRoute
    .route('/login')
    .post(loginUser);
    
usersRoute
    .route('/me')
    .get(protect, getMe);

module.exports = usersRoute;