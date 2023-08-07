const express = require('express');
const router = express.Router();
const {getAllCustomers,postCustomer} = require('../controller/customerController');
// const {AuthMiddleware} = require('../middleware/authMiddleware');
router.get("/get-customers" , getAllCustomers)
router.post("/post-customer" , postCustomer)

module.exports = router;