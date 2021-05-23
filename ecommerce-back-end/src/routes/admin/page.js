const express = require('express');
const {
  upload,
  requireSignin,
  adminMiddleware,
} = require('../../common-middleware');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();

router.post(
  '/page/create',
  requireSignin,
  adminMiddleware,
  upload.fields([
    { name: 'banners', maxCount: 10 },
    { name: 'products', maxCount: 10 },
  ]),
  createPage
);

router.get('/page/:category/:type', getPage);

module.exports = router;
