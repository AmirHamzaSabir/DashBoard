const AsyncHandler = require('express-async-handler');
const Delivery = require("../models/deliveryModel");
const { paginateArray } = require('../customFunctons/functions');
const getAllDeliveryCodes = AsyncHandler(async(req,res) =>{
    const allCodes = await Delivery.find();
    res.status(200).json({allCodes});
})

const getDeliveryCodesChunk = AsyncHandler(async (req, res) => {
    const delivery = await Delivery.find();
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
  
    const dataAsc = delivery.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
  
    const filteredData = dataToFilter.filter(
      user => {
        return  (user.countryName.toLowerCase().includes(queryLowered) ||
        user.district.toLowerCase().includes(queryLowered) ) &&
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
  const getSingleDeliveryCode = AsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const record = await Delivery.findById(id);
    res.status(200).json(record);
})


const addDeliveryCode = AsyncHandler(async(req, res) => {
    const { pinCode, district, countryName, codFee} = req.body;  
        const record = await Delivery.create({
            pinCode, district, countryName, codFee
        });
        res.status(200).json({record})
    
});

const updateDeliveryCode = AsyncHandler(async(req,res)=>{
    const user = req.user;
    var record = null;
 if(user.role === 2 || user.role === 1){
    const data = await Delivery.findById(req.params.id);
    if (data) {
      record = await Delivery.findOneAndUpdate(
        { _id: `${req.params.id}` },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(record);
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

const removeDeliveryCode = AsyncHandler(async(req,res) =>{
    const id = req.params.id;
    const record = await Delivery.deleteOne({ _id: id });
    res.status(200).json({record});
});

module.exports ={
    getAllDeliveryCodes,
    getSingleDeliveryCode,
    getDeliveryCodesChunk,
    addDeliveryCode,
    updateDeliveryCode,
    removeDeliveryCode
}