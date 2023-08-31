const express = require('express');
const { addProduct,getProducts,updateProduct, getProduct, removeProduct, getProductsChunk } = require('../controller/productController');
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post('/get-products-chunk', getProductsChunk);
router.post('/add-product',addProduct)
router.get('/get-products',getProducts)
//New Routes
router.get('/get-product/:id',getProduct)
router.put('/update-product/:id',AuthMiddleware,updateProduct)
router.delete('/remove-product/:id',removeProduct)

module.exports = router;