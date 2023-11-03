const express = require('express');
const { getAllSiteFeatures, getSingleSiteFeature, updateSiteFeature, postSiteFeature, postPromotion, getAllPromotions, getPromotionsChunk, removePromotion, postBanner, getAllBanners, getBannersChunk, removeBanner, postHeader, getAllHeaders, getHeadersChunk, removeHeader, postFooter, getAllFooters, getFootersChunk, removeFooter } = require('../controller/webSiteController');
const router = express.Router();

router.get('/get-sitefeatures', getAllSiteFeatures);
router.get('/get-sitefeature/:id', getSingleSiteFeature);
router.put('/update-sitefeature/:id', updateSiteFeature);
router.post('/add-sitefeature', postSiteFeature);
// Adding the routes for the promoitons
router.post('/add-promotion', postPromotion);
router.get('/get-promotions', getAllPromotions);
router.post('/get-promotions-chunk', getPromotionsChunk);
router.delete('/remove-promotion/:id', removePromotion);
// Adding the routes for the banners
router.post('/add-banner', postBanner);
router.get('/get-banners', getAllBanners);
router.post('/get-banners-chunk', getBannersChunk);
router.delete('/remove-banner/:id', removeBanner);
// Adding the routes for the header
router.post('/add-header', postHeader);
router.get('/get-headers', getAllHeaders);
router.post('/get-headers-chunk', getHeadersChunk);
router.delete('/remove-header/:id', removeHeader);
// Adding the routes for the banners
router.post('/add-footer', postFooter);
router.get('/get-footers', getAllFooters);
router.post('/get-footers-chunk', getFootersChunk);
router.delete('/remove-footer/:id', removeFooter);

module.exports = router;