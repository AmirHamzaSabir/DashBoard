const express = require('express');
const { getAllSiteFeatures, getSingleSiteFeature, updateSiteFeature, postSiteFeature } = require('../controller/webSiteController');
const router = express.Router();

router.get('/get-sitefeatures', getAllSiteFeatures);
router.get('/get-sitefeature/:id', getSingleSiteFeature);
router.put('/update-sitefeature/:id', updateSiteFeature);
router.post('/add-sitefeature', postSiteFeature);

module.exports = router;