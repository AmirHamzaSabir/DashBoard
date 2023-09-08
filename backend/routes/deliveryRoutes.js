const express = require('express');
const { getAllDeliveryCodes, getSingleDeliveryCode, getDeliveryCodesChunk, addDeliveryCode, updateDeliveryCode, removeDeliveryCode } = require('../controller/deliveryController');
const {AuthMiddleware} = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.get("/get-countrycodes" , getAllDeliveryCodes)
router.get("/get-countrycodes/:id" , getSingleDeliveryCode)
router.post('/get-countrycodes-chunk', getDeliveryCodesChunk);
router.post("/add-countrycodes" , addDeliveryCode)
router.put("/update-countrycodes/:id",AuthMiddleware , updateDeliveryCode)
router.delete("/remove-countrycodes/:id",AuthMiddleware , removeDeliveryCode)

module.exports = router;