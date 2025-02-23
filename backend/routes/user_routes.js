const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const user_controller =require('../controllers/user_controller');
const auth_middleware=require('../middleware/auth_middleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    user_controller.registerUser
)
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    user_controller.loginUser
)

router.get('/profile', auth_middleware.authUser, user_controller.getUserProfile);

router.get('/logout',auth_middleware.authUser,user_controller.logout_user);

module.exports = router;
