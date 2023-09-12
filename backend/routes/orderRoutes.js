const express = require('express');
const { postOrder,getOrders,getSingleOrder,updateStatus,getTotalAmount, getOrdersChunk, postShippingDetails, postRefundDetails } = require('../controller/orderController');
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post('/post-order',postOrder)
router.get('/get-orders',getOrders)
router.post('/get-orders-chunk', getOrdersChunk);
router.get('/get-total',getTotalAmount)
router.get('/get-single-order/:id',getSingleOrder)
router.put('/update-status/:id',AuthMiddleware,updateStatus)
router.put('/post-shipping-detail/:id',AuthMiddleware,postShippingDetails)
router.put('/post-refund-detail/:id', AuthMiddleware,postRefundDetails)

module.exports = router;