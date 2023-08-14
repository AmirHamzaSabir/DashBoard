const AsyncHandler = require("express-async-handler");
const SiteFeature = require("../models/webSiteModel");

const getAllSiteFeatures = AsyncHandler(async (req, res) => {
  const siteFeature = await SiteFeature.find();
  res.status(200).json({ siteFeature });
});

const postSiteFeature = AsyncHandler(async (req, res) => {
  try {
    const { banner, popUp } = req.body;
    if (banner && popUp ) {
        const siteFeature = await SiteFeature.create({
            ...req.body
          });
          res.status(200).json({ siteFeature });
    } else {
      res.status(400);
      throw new Error("Please enter all fields");
    }
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating SiteFeature");
  }
});

const getSingleSiteFeature = AsyncHandler(async (req, res) => {
  const siteFeature = await SiteFeature.findById(req.params.id);
  res.status(200).json({siteFeature});
})

const updateSiteFeature = AsyncHandler(async(req,res)=>{
  const user = req.user;
  var response = null;
if(user.role === 2 || user.role === 1){
  const data = await SiteFeature.findById(req.params.id);
  if (data) {
    response = await SiteFeature.findOneAndUpdate(
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

module.exports = {
  getAllSiteFeatures,
  postSiteFeature,
  getSingleSiteFeature,
  updateSiteFeature
};
