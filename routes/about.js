var express = require('express');
var router = express.Router();
const aboutController = require('../controllers/about');

/* GET home page. */
router.get('/', aboutController.index);

module.exports = router;
