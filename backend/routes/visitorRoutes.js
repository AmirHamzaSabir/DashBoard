const express = require('express'); 
const { getTotalUsers, getTotalCount } = require('../controller/visitorController');
const router = express.Router();

router.post('/track', getTotalUsers);
router.get('/getCount', getTotalCount);

module.exports = router;