const express = require('express');
const { postOrder,getOrders,getSingleOrder,updateStatus,getTotalAmount } = require('../controller/orderController');
const router = express.Router();

router.post('/post-order',postOrder)
router.get('/get-orders',getOrders)
router.get('/get-total',getTotalAmount)
router.get('/get-single-order/:id',getSingleOrder)
router.put('/update-status/:id',updateStatus)

module.exports = router;