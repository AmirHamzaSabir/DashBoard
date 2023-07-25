const express = require('express');
const { addProduct,getProducts,updateProduct, getProduct, removeProduct } = require('../controller/productController');
const router = express.Router();

router.post('/add-product',addProduct)
router.get('/get-products',getProducts)
//New Routes
router.get('/get-product/:id',getProduct)
router.put('/update-product/:id',updateProduct)
router.delete('/remove-product/:id',removeProduct)

module.exports = router;