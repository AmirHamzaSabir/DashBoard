const express = require('express');
const { addProduct,getProducts } = require('../controller/productController');
const router = express.Router();

router.post('/add-product',addProduct)
router.get('/get-products',getProducts)

module.exports = router;