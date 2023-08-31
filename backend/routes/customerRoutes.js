const express = require('express');
const router = express.Router();
const {getAllCustomers,postCustomer,getSingleCustomer, updateCustomer, getCustomersChunk, removeCustomer} = require('../controller/customerController');
const {AuthMiddleware} = require('../middlewares/authenticationMiddleware');
router.get("/get-customers" , getAllCustomers)
router.get("/get-customer/:id" , getSingleCustomer)
router.post('/get-customers-chunk', getCustomersChunk);
router.post("/add-customer" , postCustomer)
router.put("/update-customer/:id",AuthMiddleware , updateCustomer)
router.delete("/remove-customer/:id",AuthMiddleware , removeCustomer)

module.exports = router;