const AsyncHandler = require('express-async-handler');
const Delivery = require("../models/deliveryModel");
const { paginateArray } = require('../customFunctons/functions');
const multer = require("multer");
const storage = multer.memoryStorage();
const readXlsxFile = require('read-excel-file/node')
const upload = () => multer({storage});

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


const readThroughExcel = AsyncHandler(async (req, res) => {
  try{
    var codesArray = [], emptyRows = 0;
    const uploadSingle = await upload().single("file");
    uploadSingle(req, res, async err => {
      if (err) return res.status(401).json({status: false, message: err.message});
      // Reading the Excel file
      readXlsxFile(Buffer.from(req.file.buffer)).then(async (rows) => {
        for(let index= 0; index < rows.length; index++){
          if(index === 0){
            // Check if the header row is valid
            if (
              rows[index][0]?.toLowerCase().replace(" ", "").trim() !== "pincode" ||
              rows[index][1]?.toLowerCase().replace(" ", "").trim() !== "district" ||
              rows[index][2]?.toLowerCase().replace(" ", "").trim() !== "countryname"
            ) {
              return res.status(401).json({
                status: false,
                message:
                  "Header row must contain columns 'Pin Code', 'District', and 'Country Name'.",
              });
              
            } else {
              continue;
            }
          }else if(index > 0) {
              // Check if all values in the row are null
              if (rows[index].every((value) => value === null)) {
                emptyRows++;
                continue;
              }
              if (rows[index][0] !== null && rows[index][1] !== null && rows[index][2] !== null){
                const data = {
                  pinCode: rows[index][0],
                  district: rows[index][1],
                  countryName: rows[index][2]
                }
                codesArray.push(data);
              }else{
                return res.status(401).json({status: false, message: `Error Occured while reading the data at row: ${index}`});
              }
          }
        }
        try{
          if(codesArray.length > 0 && codesArray.length === (rows.length - emptyRows -1)){
            const response = await Delivery.insertMany(codesArray)
            return res.status(200).json({response})
          }
        } catch (err) {
          res.status(401).json({message: "Error occurred while inserting data. Due to duplication."});
        }
        //  rows.forEach(async(row, index) => {
        //    if(index === 0){
        //     console.log(index)
        //     // Check if the header row is valid
        //     if (
        //       row[0]?.toLowerCase().trim() !== "pincode" ||
        //       row[1]?.toLowerCase().trim() !== "district" ||
        //       row[2]?.toLowerCase().trim() !== "countryname"
        //     ) {
        //       return res.status(401).json({
        //         status: false,
        //         message:
        //           "Header row must contain columns 'Pin Code', 'District', and 'Country Name'.",
        //       });
        //     } else {
        //       return;
        //     }
        //   }else if(index > 0) {
        //       // Check if all values in the row are null
        //       if (row.every((value) => value === null)) {
        //         // If all values are null, continue to the next iteration
        //         return;
        //       }
        //       if (row[0] !== null && row[1] !== null && row[2] !== null){
        //         const data = {
        //           pinCode: row[0],
        //           district: row[1],
        //           countryName: row[2]
        //         }
        //         codesArray.push(data);
        //         if(index === rows.length-1){
        //           const response = await Delivery.insertMany(codesArray)
        //           return res.status(200).json({response})
        //         }
        //       }else{
        //         return res.status(401).json({status: false, message: `Error Occured while reading the data at row: ${index}`});
        //       }
        //   }
        //  })
      })
      
    })
  } catch (err) {
    res.status(401).json({message: "Error while reading excel file"});
  }
});


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
    removeDeliveryCode,
    readThroughExcel
}