const { Router } = require('express');
const controllers = require('./account.controllers');
const passport = require('passport');

const router = Router();


router
    .get('/accounts', controllers.getAccounts)
    .post('/accounts', controllers.createAccount);


module.exports = router;