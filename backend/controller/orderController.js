const AsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { paginateArray } = require('../customFunctons/functions');


const postOrder = AsyncHandler(async (req, res) => {
    const {
        customer,
        product
    } = req.body;
    // find the category

    const order = await Order.create({
        customer,
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

const getOrdersChunk = AsyncHandler(async (req, res) => {
    const order = await Order.find();
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = 'asc',
      status = null,
      sortColumn = 'name'
    } = req.body

    /* eslint-disable  */
    const queryLowered = q.toLowerCase()
  
    const dataAsc = order.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

    const dataArr = await Order.aggregate([
        {
          $lookup: {
            from: 'products', // Name of the products collection
            localField: 'productId',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        {
          $match: {
            'productInfo.name': {
                $regex: queryLowered, // Use a regular expression for partial matching
                $options: 'i', // Optional: Case-insensitive matching
              },
          },
        },
      ])
      
    const filteredData = queryLowered !== "" ? dataArr : dataToFilter.filter(
      user => user.status.toLowerCase() === status.toLowerCase()
    )

    /* eslint-enable  */
      const response = {
        total: filteredData.length,
        users: paginateArray(filteredData, perPage, page)
      }
      res.status(200).json(response)
   
  });

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
    const user = req.user;
    try{
        if(user.role === 2 || user.role === 1){
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
        }
        else {
            res.status(401);
            throw new Error("You are not Authorized");
        }
    }
    catch(err){
        res.status(404)
        throw new Error("UnHandleable error");
        
    }
})

const getTotalAmount = AsyncHandler(async (req, res) => {
    const totalAmount = await Order.aggregate([{
            $lookup: {
                from: 'products',
                localField: 'productId',
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

const postShippingDetails = AsyncHandler(async (req,res) => {
    const id = req.params.id;
    const user = req.user;
    try{
        if(user.role === 2 || user.role === 1){
            const order = await Order.findById(id);
            if(order){
                const updatedOrder = await Order.findByIdAndUpdate(id, {
                    $push:{
                        shippingDetails : req.body
                    }
                }, {new:true})
                res.status(200).json(updatedOrder);
            }
            else{
                res.status(404);
                throw new Error("Order not found");
            }
        }
        else {
            res.status(401);
            throw new Error("You are not Authorized");
        }
    }
    catch(err){
        res.status(404)
        throw new Error("UnHandleable error");
        
    }
});
const postRefundDetails = AsyncHandler(async (req,res) => {
    const id = req.params.id;
    const user = req.user;
    try{
        if(user.role === 2 || user.role === 1){
            const order = await Order.findById(id);
            if(order){
                const updatedOrder = await Order.findByIdAndUpdate(id, {
                    $push:{
                        refundDetails : req.body
                    }
                }, {new:true})
                res.status(200).json(updatedOrder);
            }
            else{
                res.status(404);
                throw new Error("Order not found");
            }
        }
        else {
            res.status(401);
            throw new Error("You are not Authorized");
        }

    }
    catch(err){
        res.status(404)
        throw new Error("UnHandleable error");
        
    }
});



module.exports = {
    postOrder,
    getOrders,
    getSingleOrder,
    updateStatus,
    getTotalAmount,
    getOrdersChunk,
    postShippingDetails,
    postRefundDetails
}