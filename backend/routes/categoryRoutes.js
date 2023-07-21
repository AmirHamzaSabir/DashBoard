const express = require('express');
const router = express.Router();
const { addCategory,getCategory } = require('../controller/categoryController'); 
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
router.post('/add-category', AuthMiddleware ,addCategory);
router.get('/get-category', getCategory);


module.exports = router;