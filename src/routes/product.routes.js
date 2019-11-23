const { Router } = require('express');
const passport = require('passport');
const controllers = require('../controllers/product.controllers');
const { validateObjectId } = require('../middlewares/validate.middleware');
const { upload, limitFiles } = require('../middlewares/multer.middleware');
const router = Router();


router.get('/products', controllers.getProducts);
router.get('/products/:id', validateObjectId, controllers.getProductByObjectId);
router.post('/products', passport.authenticate('authenticate', { session: false }), upload.any(), limitFiles, controllers.createProduct);

// TODO: Hacer que se borren las imagenes almacenas en la cloud: por hace jose segura.
router.delete('/products', passport.authenticate('authenticate', { session: false }), validateObjectId, controllers.deleteProductByObjectId);


module.exports = router;