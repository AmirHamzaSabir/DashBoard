const express = require('express');
const router = express.Router();
const { handleRefund } = require('../controller/refundController');
const { chargeAmount } = require('../controller/paymentController');
router.post('/refund', handleRefund);
router.post('/charge', chargeAmount);


module.exports = router;