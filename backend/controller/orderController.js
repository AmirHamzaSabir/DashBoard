const AsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');


const postOrder = AsyncHandler(async (req, res) => {
    const {
        user,
        product
    } = req.body;
    // find the category

    const order = await Order.create({
        user,
        product
    });
    res.status(200).json(order)

});
const getOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find().sort({
        _id: -1
    });
    res.json(orders);
})


const getSingleOrder = AsyncHandler(async (req, res) => {
    const orderID = req.params.id
    const singleOrder = await Order.findOne({
        _id: orderID
    });
    if (singleOrder) {
        res.status(200).json(singleOrder)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const updateStatus = AsyncHandler(async (req, res) => {
    const p_id = req.params.id;
    const product = await Order.findById(p_id);
    if (product) {
        const updatedProduct = await Order.findByIdAndUpdate(p_id, {
            status: req.body.status
        }, {
            new: true,
        })
        res.status(200).json(updatedProduct)
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
})

const getTotalAmount = AsyncHandler(async (req, res) => {
    const totalAmount = await Order.aggregate([{
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productData',
            },
        },
        {
            $unwind: '$productData',
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: {
                        $toDouble: '$productData.price',
                    },
                },
            },
        },
    ]);

    if (totalAmount.length > 0) {
        res.status(200).json(totalAmount[0].total);
    } else {
        res.json(0);
    }
});





module.exports = {
    postOrder,
    getOrders,
    getSingleOrder,
    updateStatus,
    getTotalAmount
}