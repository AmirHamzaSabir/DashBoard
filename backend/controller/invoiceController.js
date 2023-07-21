const AsyncHandler = require('express-async-handler');
const Invoice = require('../models/invoiceModel');


const addInvoice = AsyncHandler(async (req, res) => {
    const { issueDate,dueDate,user,item,cost,quantity,description,salesPerson,message,note } = req.body;
    
        const invoice = await Invoice.create({
            issueDate,dueDate,user,item,cost,quantity,description,salesPerson,message,note
        });
        res.status(200).json(invoice);
    
});

const getInvoice = AsyncHandler(async (req, res) => {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
})

module.exports = {
    addInvoice,
    getInvoice
}