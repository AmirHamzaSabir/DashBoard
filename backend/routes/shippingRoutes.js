const express = require('express');
const { addShipping,getShipping } = require('../controller/shippingController');
const router = express.Router();

router.post('/post-shipping',addShipping)
router.get('/get-shipping',getShipping)


module.exports = router;