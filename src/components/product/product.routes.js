const { Router } = require('express');
const passport = require('passport');
const controllers = require('./product.controllers');
const CoreComponent = require('../core/core.provider');
const ImageComponent = require('../image/image.provider');

const router = Router();

const { validate } = CoreComponent.middlewares;
const { validators } = CoreComponent.utils;
const { upload, limitFiles } = ImageComponent.middlewares;


// router
//     .get('/products', controllers.getProducts)
//     .get('/products/:id', validators, validate, controllers.getProductByObjectId)
//     .post('/products', passport.authenticate('authenticate', { session: false }), upload.any(), limitFiles, controllers.createProduct)
//     .delete('/products', passport.authenticate('authenticate', { session: false }), validateObjectId, controllers.deleteProductByObjectId)


module.exports = router;