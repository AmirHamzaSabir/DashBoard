const express = require('express');
const router = express.Router();
const {getAllCustomers,postCustomer,getSingleCustomer, updateCustomer} = require('../controller/customerController');
const {AuthMiddleware} = require('../middlewares/authenticationMiddleware');
router.get("/get-customers" , getAllCustomers)
router.get("/get-customer/:id" , getSingleCustomer)
router.post("/add-customer" , postCustomer)
router.put("/update-customer/:id",AuthMiddleware , updateCustomer)

module.exports = router;