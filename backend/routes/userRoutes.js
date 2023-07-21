const express = require('express');
const { registerUser, loginUser, getUsers, getAdmins,addNewUser } = require('../controller/userController');
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getUsers);
router.get('/get-admins',AuthMiddleware, getAdmins);
router.post('/add-new-user',AuthMiddleware, addNewUser);

module.exports = router;