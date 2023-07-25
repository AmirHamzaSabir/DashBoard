const express = require('express');
const { registerUser, loginUser, getUsers, getAdmins,addNewUser, updateUser,getUserById, removeUser } = require('../controller/userController');
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getUsers);
//new route
router.get('/get-user/:id', getUserById);
router.get('/get-admins',AuthMiddleware, getAdmins);
router.post('/add-new-user',AuthMiddleware, addNewUser);
//new routes
router.put('/update-user',AuthMiddleware, updateUser);
router.delete('/remove-user/:id',AuthMiddleware,removeUser);

module.exports = router;