const { Router } = require('express');
const controllers = require('../controllers/account.controllers');
const passport = require('passport');

const router = Router();


router.get('/accounts', controllers.getAccounts);
router.post('/accounts', controllers.createAccount);


module.exports = router;