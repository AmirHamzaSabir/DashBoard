const express = require('express');
const router = express.Router();
const { addCategory,getCategories, getCategoryById, updateCategory, removeCategory, getCategoryChunk } = require('../controller/categoryController'); 
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
router.post('/add-category', AuthMiddleware ,addCategory);
router.get('/get-category', getCategories);
router.post('/get-category-chunk', getCategoryChunk);
router.get('/get-category/:id',AuthMiddleware ,getCategoryById);
router.put('/update-category/:id',AuthMiddleware ,updateCategory);
router.delete('/remove-category/:id',AuthMiddleware ,removeCategory);



module.exports = router;