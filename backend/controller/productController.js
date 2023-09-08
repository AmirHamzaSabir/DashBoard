const AsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { paginateArray } = require('../customFunctons/functions');


const addProduct = AsyncHandler(async (req, res) => {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    
});

const getProducts = AsyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

const getProductsChunk = AsyncHandler(async (req, res) => {
    const users = await Product.find();
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
  
    const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
  
    const filteredData = dataToFilter.filter(
      user => {
        return  (user.name.toLowerCase().includes(queryLowered) ||
        user.description.toLowerCase().includes(queryLowered) ) &&
      user.status === (status === false ? status :(status || user.status))
      }
       
    )
  
    /* eslint-enable  */
      const response = {
        total: filteredData.length,
        users: paginateArray(filteredData, perPage, page)
      }
      res.status(200).json(response)
   
  });

const getProduct = AsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
})

const updateProduct = AsyncHandler(async(req,res)=>{
    const user = req.user;
    var response = null;
 if(user.role === 2 || user.role === 1){
    const data = await Product.findById(req.params.id);
    if (data) {
      response = await Product.findOneAndUpdate(
        { _id: `${req.params.id}` },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(response);
    }else{
        res.status(404);
        throw new Error("Not Found");
      }
 }
 else{
    res.status(401);
    throw new Error("You are not authorized");
 }
})
const removeProduct = AsyncHandler(async(req,res) =>{
    const id = req.params.id;
    const deletedProduct = await Product.deleteOne({ _id: id });
    res.status(200).json(deletedProduct);
});
module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    removeProduct,
    getProductsChunk
}