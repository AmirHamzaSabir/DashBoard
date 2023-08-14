const express = require('express');
const { getAllPaymentGateWays, getSinglePaymentGateWay, updatePaymentGateWay, postPaymentGateWay } = require('../controller/PaymentGWController');
const router = express.Router();

router.get('/get-paymentGWs', getAllPaymentGateWays);
router.get('/get-paymentGW/:id', getSinglePaymentGateWay);
router.put('/update-paymentGW/:id', updatePaymentGateWay);
router.post('/add-paymentGW', postPaymentGateWay);

module.exports = router;