const AsyncHandler = require('express-async-handler');
const stripe = require('stripe')('sk_test_51MycIqD2171rDQ1bM2Vo43LraZJVqjoKBvTbP7yl52C5ShEqWmsSrT7kktdyrtUAuRwrOD8HRmqXnfFOXPULc7Xr00A9NYeUOU');
const Refund = require('../models/refundModel');
const handleRefund = AsyncHandler(async (req, res) => {
    const {
        refundAmount,
        refundTo
    } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: refundAmount * 100, 
            currency: 'PKR',
        });

        const refund = await stripe.refunds.create({
            amount: refundAmount * 100,
            payment_intent: paymentIntent.id, 
        });

        if (refund.status === 'succeeded') {
            res.status(200).json({
                message: 'Refund successful'
            });
        } else {
            res.status(500).json({
                message: 'Refund failed'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Refund failed',
            error: error.message
        });
    }
});

const addRefund = AsyncHandler(async (req, res) => {
        const refund = await Refund.create({
            ...req.body
        });
        res.status(200).json(refund)
    
});
const getAllRefunds = AsyncHandler(async(req,res)=>{
    const refunds = await Refund.find();
    res.status(200).json(refunds);
});



module.exports = {
    handleRefund,
    addRefund,
    getAllRefunds
};