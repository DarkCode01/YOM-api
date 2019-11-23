const { Router } = require('express');
const controllers = require('../controllers/auth.controllers');
const passport = require('passport');

const router = Router();


router.post('/auth/verify', passport.authenticate('verify', { session: false }), controllers.verifyToken);
router.post('/auth/token', passport.authenticate('login', { session: false }), controllers.getTokens);
router.post('/auth/refresh', passport.authenticate('refresh', { session: false }), controllers.getTokenByRefreshToken);


module.exports = router;