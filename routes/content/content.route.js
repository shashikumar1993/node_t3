const express = require('express');
const contentController = require('../../controllers/content.controller');
const cartValidator = require('../../middleware/cart');

const router = express.Router();
router.get('/homeBanner',contentController.getBanner);
router.post('/saveHomeBanner',contentController.saveHomeBanner);

router.get('/categories',contentController.getCategories)
router.post('/saveCategory',cartValidator.categoryValidator,contentController.saveCategories)
router.get('/bestProduct',contentController.getBestProducts)
module.exports = router;