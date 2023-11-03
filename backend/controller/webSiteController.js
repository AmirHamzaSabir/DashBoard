const AsyncHandler = require("express-async-handler");
const SiteFeature = require("../models/webSiteModel");
const PromotionScheme = require("../models/promotionModel")
const BannerScheme = require("../models/bannerModel")
const headerScheme = require("../models/headerModel")
const footerScheme = require("../models/footerModel")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
var cron = require('node-cron');
cron.schedule('* * * * *', async () => {
  var promotion = await PromotionScheme.find();
  if (promotion.length > 0) {
    promotion.forEach(activePromotion => {
      if(activePromotion.status) {
        var currentDate = new Date()
        var endDate = new Date(activePromotion.createdAt)
        endDate.setDate(endDate.getDate() + activePromotion.days);
        const milliseconds = endDate - currentDate.getTime();
        if (milliseconds <= 0) {
          activePromotion.status = false;
          activePromotion.save();
        }
      }
    })

  }
});
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const sharp = require("sharp");
const { paginateArray } = require("../customFunctons/functions");

const regionName = process.env.S3_REGION;
const accessKey = process.env.S3_ACCESSKEY;
const secretAccessKey = process.env.S3_SECRETACCESSKEY;
const bucketName = process.env.S3_BUCKETNAME;
// Creating the upload function for Memory Storage
const storage = multer.memoryStorage();
const upload = () => multer({ storage: storage });

const client = new S3Client({
  region: regionName,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});
async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const url = await getSignedUrl(client, command);
  return url;
}
async function deleteObject(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  const command = new DeleteObjectCommand(params);
  const response = await client.send(command);
  return response;
}
async function putObjectURL(filename, contentType) {
  const key = filename;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(client, command);
  return url;
}
const getAllSiteFeatures = AsyncHandler(async (req, res) => {
  const siteFeature = await SiteFeature.find();
  res.status(200).json({ siteFeature });
});

const postSiteFeature = AsyncHandler(async (req, res) => {
  try {
    const uploadSingle = await upload().single("image");
    uploadSingle(req, res, async (err) => {
      if (err) return res.status(401).json({message: err });
      const imageName = Date.now()
      const imageBuffer = await sharp(req.file.buffer)
        .resize({width: 2376, height : 807, fit:"contain"})
        .toFormat("jpeg")
        .toBuffer();

      const params = {
        Bucket: bucketName,
        Key: `banner/${imageName}`,
        Body: imageBuffer,
        ContentType: "image/jpeg",
      };
      const command = new PutObjectCommand(params);
      const response = await client.send(command);
      if(response.$metadata.httpStatusCode === 200){
        try{
          const data =  await SiteFeature.create({...req.body, banner:imageName});
          res.status(200).json({message: "Image Added Successfully" , data});
        }catch(err){
          res.status(401).json({message: "All Fields are required!"});
        }
      }else{
        res.status(401).json({message: "Error Occured!"});
      }
    });
  } catch (err) {
    res.status(403).json({message: "Error while creating SiteFeature"});
  }
});

const getSingleSiteFeature = AsyncHandler(async (req, res) => {
  const siteFeature = await SiteFeature.findById(req.params.id);
  res.status(200).json({ siteFeature });
});

const updateSiteFeature = AsyncHandler(async (req, res) => {
  const user = req.user;
  var response = null;
  if (user.role === 2 || user.role === 1) {
    const data = await SiteFeature.findById(req.params.id);
    if (data) {
      response = await SiteFeature.findOneAndUpdate(
        { _id: `${req.params.id}` },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(response);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } else {
    res.status(401);
    throw new Error("You are not authorized");
  }
});

// Promotions Apis start from here
const postPromotion = AsyncHandler(async(req, res) => {
  try{
        const uploadSingle = await upload().single("image");
        uploadSingle(req, res, async (err) => {
          if (err) return res.status(401).json({message:err});
          const imageName = Date.now();
          const imageBuffer = await sharp(req.file.buffer)
            .resize({width: 759, height : 638, fit:"contain"})
            .toFormat("jpeg")
            .toBuffer();
          // const imageBuffer =  ""
          const params = {
            Bucket: bucketName,
            Key:`promotions/${imageName}`,
            Body: imageBuffer,
            ContentType:"image/jpeg"
          };
          const command = new PutObjectCommand(params);
          const response = await client.send(command);
          if(response.$metadata.httpStatusCode === 200){
            try {
              const data =  await PromotionScheme.create({image:imageName, ...req.body});
              res.status(200).json(data);
            } catch (err) {
              await deleteObject(`promotions/${imageName}`);
              res.status(401).json({message: err});
            }
          }else{
            res.status(401).json({message: "Error Occured!"});
          }

        })
  }catch(err){
    res.status(403).json({message: "Error while creating Promotion"});
  }
})
const getAllPromotions = AsyncHandler(async (req, res) => {
  try{
    var promotions = await PromotionScheme.find();
    if(promotions.length > 0){
      for(const promotion of promotions){
        if(promotion.image !== ""){
          const imageUrl = await getObjectURL(`promotions/${promotion.image}`);
          promotion._doc.imageUrl = imageUrl;
        }else {
          promotion._doc.imageUrl = "";
        }
      }
    res.status(200).json(promotions)

    }else{
      res.status(401).json({message: "No Data found"});
    }
  }catch(err){
    res.status(403).json({message: "Error while Getting Promotion"});
  }
})
const getPromotionsChunk = AsyncHandler(async (req, res) => {
  const users = await PromotionScheme.find();
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()
  if(users.length > 0){
    for(const promotion of users){
      if(promotion.image !== ""){
        const imageUrl = await getObjectURL(`promotions/${promotion.image}`);
        promotion._doc.imageUrl = imageUrl;
      }else {
        promotion._doc.imageUrl = "";
      }
    }
  }
  const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => {
      return  (user.title.toLowerCase().includes(queryLowered) ||
      user.amount === queryLowered ) &&
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
const removePromotion = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const promotion = await PromotionScheme.findOne({_id: id});
  const response = await deleteObject(`promotions/${promotion.image}`);
  if(response.$metadata.httpStatusCode === 204) {
  const deletedUser = await PromotionScheme.deleteOne({ _id: id });
  deletedUser.acknowledged ? res.status(200).json(promotion) : res.status(401).json({message : "Not Found"})
  } else {
    res.status(401).json({message: "Image Not Found"})
  }
});

// Banners Apis start from here
const postBanner = AsyncHandler(async(req, res) => {
  try{
        const uploadSingle = await upload().single("image");
        uploadSingle(req, res, async (err) => {
          if (err) return res.status(401).json({message:err});
          const imageName = Date.now();
          const imageBuffer = await sharp(req.file.buffer)
            .resize({width: 2376, height : 807, fit:"contain"})
            .toFormat("jpeg")
            .toBuffer();
          // const imageBuffer =  ""
          const params = {
            Bucket: bucketName,
            Key:`banners/${imageName}`,
            Body: imageBuffer,
            ContentType:"image/jpeg"
          };
          const command = new PutObjectCommand(params);
          const response = await client.send(command);
          if(response.$metadata.httpStatusCode === 200){
            try {
              const data =  await BannerScheme.create({image:imageName, ...req.body});
              res.status(200).json(data);
            } catch (err) {
              await deleteObject(`banners/${imageName}`);
              res.status(401).json({message: err});
            }
          }else{
            res.status(401).json({message: "Error Occured!"});
          }

        })
  }catch(err){
    res.status(403).json({message: "Error while creating Promotion"});
  }
})
const getAllBanners = AsyncHandler(async (req, res) => {
  try{
    var promotions = await BannerScheme.find();
    // console.log(promotions)
    if(promotions.length > 0){
      for(const promotion of promotions){
        if(promotion.image !== ""){
          const imageUrl = await getObjectURL(`banners/${promotion.image}`);
          promotion._doc.imageUrl = imageUrl;
        }else {
          promotion._doc.imageUrl = "";
        }
      }
      console.log(promotions)
    res.status(200).json(promotions)

    }else{
      res.status(401).json({message: "No Data found"});
    }
  }catch(err){
    res.status(403).json({message: "Error while Getting Promotion"});
  }
})
const getBannersChunk = AsyncHandler(async (req, res) => {
  const users = await BannerScheme.find();
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()
  if(users.length > 0){
    for(const promotion of users){
      if(promotion.image !== ""){
        const imageUrl = await getObjectURL(`banners/${promotion.image}`);
        promotion._doc.imageUrl = imageUrl;
      }else {
        promotion._doc.imageUrl = "";
      }
    }
  }
  const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => {
      return  (user.title.toLowerCase().includes(queryLowered) ||
      user.amount === queryLowered ) &&
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
const removeBanner = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const promotion = await BannerScheme.findOne({_id: id});
  const response = await deleteObject(`banners/${promotion.image}`);
  if(response.$metadata.httpStatusCode === 204) {
  const deletedUser = await BannerScheme.deleteOne({ _id: id });
  deletedUser.acknowledged ? res.status(200).json(promotion) : res.status(401).json({message : "Not Found"})
  } else {
    res.status(401).json({message: "Image Not Found"})
  }
});

// Header api start from here
const postHeader = AsyncHandler(async(req, res) => {
  try{
        const uploadSingle = await upload().single("image");
        uploadSingle(req, res, async (err) => {
          if (err) return res.status(401).json({message:err});
          const imageName = Date.now();
          const imageBuffer = await sharp(req.file.buffer)
            .resize({width: 759, height : 638, fit:"contain"})
            .toFormat("jpeg")
            .toBuffer();
          // const imageBuffer =  ""
          const params = {
            Bucket: bucketName,
            Key:`header/${imageName}`,
            Body: imageBuffer,
            ContentType:"image/jpeg"
          };
          const command = new PutObjectCommand(params);
          const response = await client.send(command);
          if(response.$metadata.httpStatusCode === 200){
            try {
              const data =  await headerScheme.create({image:imageName, ...req.body});
              res.status(200).json(data);
            } catch (err) {
              await deleteObject(`header/${imageName}`);
              res.status(401).json({message: err});
            }
          }else{
            res.status(401).json({message: "Error Occured!"});
          }

        })
  }catch(err){
    res.status(403).json({message: "Error while creating Promotion"});
  }
})
const getAllHeaders = AsyncHandler(async (req, res) => {
  try{
    var promotions = await headerScheme.find();
    // console.log(promotions)
    if(promotions.length > 0){
      for(const promotion of promotions){
        if(promotion.image !== ""){
          const imageUrl = await getObjectURL(`header/${promotion.image}`);
          promotion._doc.imageUrl = imageUrl;
        }else {
          promotion._doc.imageUrl = "";
        }
      }
      console.log(promotions)
    res.status(200).json(promotions)

    }else{
      res.status(401).json({message: "No Data found"});
    }
  }catch(err){
    res.status(403).json({message: "Error while Getting Promotion"});
  }
})
const getHeadersChunk = AsyncHandler(async (req, res) => {
  const users = await headerScheme.find();
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()
  if(users.length > 0){
    for(const promotion of users){
      if(promotion.image !== ""){
        const imageUrl = await getObjectURL(`header/${promotion.image}`);
        promotion._doc.imageUrl = imageUrl;
      }else {
        promotion._doc.imageUrl = "";
      }
    }
  }
  const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => {
      return  (user.title.toLowerCase().includes(queryLowered) ||
      user.amount === queryLowered ) &&
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
const removeHeader = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const promotion = await headerScheme.findOne({_id: id});
  const response = await deleteObject(`header/${promotion.image}`);
  if(response.$metadata.httpStatusCode === 204) {
  const deletedUser = await headerScheme.deleteOne({ _id: id });
  deletedUser.acknowledged ? res.status(200).json(promotion) : res.status(401).json({message : "Not Found"})
  } else {
    res.status(401).json({message: "Image Not Found"})
  }
});
// Header api start from here
const postFooter = AsyncHandler(async(req, res) => {
  try{
        const uploadSingle = await upload().single("image");
        uploadSingle(req, res, async (err) => {
          if (err) return res.status(401).json({message:err});
          if(req.file) {
              const imageName = Date.now();
            const imageBuffer = await sharp(req.file.buffer)
              .resize({width: 759, height : 638, fit:"contain"})
              .toFormat("jpeg")
              .toBuffer();
            // const imageBuffer =  ""
            const params = {
              Bucket: bucketName,
              Key:`footer/${imageName}`,
              Body: imageBuffer,
              ContentType:"image/jpeg"
            };
            const command = new PutObjectCommand(params);
            const response = await client.send(command);
            if(response.$metadata.httpStatusCode === 200){
              try {
                const data =  await footerScheme.create({image:imageName, ...req.body});
                res.status(200).json(data);
              } catch (err) {
                await deleteObject(`footer/${imageName}`);
                res.status(401).json({message: err});
              }
            }else{
              res.status(401).json({message: "Error Occured!"});
            }

          } else {
                const data =  await footerScheme.create({...req.body});
                res.status(200).json(data); 
          }
        })
  }catch(err){
    res.status(403).json({message: "Error while creating Promotion"});
  }
})
const getAllFooters = AsyncHandler(async (req, res) => {
  try{
    var promotions = await footerScheme.find();
    // console.log(promotions)
    if(promotions.length > 0){
      for(const promotion of promotions){
        if(promotion.image !== ""){
          const imageUrl = await getObjectURL(`footer/${promotion.image}`);
          promotion._doc.imageUrl = imageUrl;
        }else {
          promotion._doc.imageUrl = "";
        }
      }
      console.log(promotions)
    res.status(200).json(promotions)

    }else{
      res.status(401).json({message: "No Data found"});
    }
  }catch(err){
    res.status(403).json({message: "Error while Getting Promotion"});
  }
})
const getFootersChunk = AsyncHandler(async (req, res) => {
  const users = await footerScheme.find();
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()
  if(users.length > 0){
    for(const promotion of users){
      if(promotion.image !== ""){
        const imageUrl = await getObjectURL(`footer/${promotion.image}`);
        promotion._doc.imageUrl = imageUrl;
      }else {
        promotion._doc.imageUrl = "";
      }
    }
  }
  const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => {
      return  (user.title.toLowerCase().includes(queryLowered) ||
      user.amount === queryLowered ) &&
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
const removeFooter = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const promotion = await footerScheme.findOne({_id: id});
  const response = await deleteObject(`footer/${promotion.image}`);
  if(response.$metadata.httpStatusCode === 204) {
  const deletedUser = await footerScheme.deleteOne({ _id: id });
  deletedUser.acknowledged ? res.status(200).json(promotion) : res.status(401).json({message : "Not Found"})
  } else {
    res.status(401).json({message: "Image Not Found"})
  }
});

module.exports = {
  getAllSiteFeatures,
  postSiteFeature,
  getSingleSiteFeature,
  updateSiteFeature,
  postPromotion,
  getAllPromotions,
  getPromotionsChunk,
  removePromotion,
  postBanner,
  getAllBanners,
  getBannersChunk,
  removeBanner,
  postHeader,
  getAllHeaders,
  getHeadersChunk,
  removeHeader,
  postFooter,
  getAllFooters,
  getFootersChunk,
  removeFooter
};
