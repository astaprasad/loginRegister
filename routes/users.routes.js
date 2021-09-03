const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const {authenticate} = require('../middleware/user.auth')


//User router api code
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/search',authenticate,userController.searchUser);
router.get('/userlist',authenticate,userController.getAllUsers);
router.get('/logout',authenticate,userController.logout);

module.exports = router;



