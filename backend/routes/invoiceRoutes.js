const express = require('express');
const router = express.Router();
const { addInvoice,getInvoice } = require('../controller/invoiceController'); 
router.post('/add-invoice' ,addInvoice);
router.get('/get-invoice' ,getInvoice);


module.exports = router;