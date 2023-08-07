const express = require('express');
const { getAllCodes } = require('../controller/deliveryController');
const router = express.Router();

router.get('/get-countrycodes', getAllCodes);

module.exports = router;