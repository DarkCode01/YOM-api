const { Router } = require('express');
const controllers = require('./account.controllers');
const passport = require('passport');

const router = Router();


router
    .get('/accounts', passport.authenticate('authenticate', { session: false }), controllers.getAccounts)
    .post('/accounts', controllers.createAccount);


module.exports = router;