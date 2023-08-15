const express = require('express');
const { addRefund, getAllRefunds } = require('../controller/refundController');
const router = express.Router();

router.post('/add-refund',addRefund)
router.get('/get-refunds',getAllRefunds)


module.exports = router;