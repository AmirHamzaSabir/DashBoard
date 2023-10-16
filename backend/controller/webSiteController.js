const AsyncHandler = require("express-async-handler");
const SiteFeature = require("../models/webSiteModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const sharp = require("sharp");

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
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(client, command);
  return url;
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

const postPopup = AsyncHandler(async(req, res) => {
  try{
        const uploadSingle = await upload().single("image");
        uploadSingle(req, res, async (err) => {
          if (err) return res.status(401).json({message});
          const imageName = Date.now();
          const imageBuffer = await sharp(req.file.buffer)
            .resize({width: 2376, height : 807, fit:"contain"})
            .toFormat("jpeg")
            .toBuffer();
        })
  }catch(err){

  }
})

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
        const data =  await SiteFeature.create({banner:imageName});
        res.status(200).json({message: "Image Added Successfully" , data});
      }else{
        res.status(401).json({message: "Error Occured!" , data});
      }
    });
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating SiteFeature");
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

module.exports = {
  getAllSiteFeatures,
  postSiteFeature,
  getSingleSiteFeature,
  updateSiteFeature,
};
