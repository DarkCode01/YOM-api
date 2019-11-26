const { Router } = require('express');
const passport = require('passport');

const controllers = require('./auth.controllers');

const router = Router();

/**
 * @api {POST} /api/auth/verify Verify Token Access
 * @apiName authVerifyToken
 * @apiGroup Authorization
 *
 * @apiSuccess (200) { tokenType, isValid }.
 * @apiError (500) {object} Internal server error.
 */
router.post('/auth/verify', passport.authenticate('verify', { session: false }), controllers.verifyToken);

/**
 * @api {GET} /api/accounts Get all Accounts
 * @apiName authGetToken
 * @apiGroup Authorization
 *
 * @apiSuccess (200) { access, refresh }
 * @apiError (401) {object} Not authoriozated.
 * @apiError (500) {object} Internal server error.
 */
router.post('/auth/token', passport.authenticate('login', { session: false }), controllers.getTokens);

/**
 * @api {GET} /api/accounts Get all Accounts
 * @apiName authRefreshToken
 * @apiGroup Authorization
 *
 * @apiSuccess (200) { access }
 * @apiError (401) {object} Not authoriozated.
 * @apiError (500) {object} Internal server error.
 */
router.post('/auth/refresh', passport.authenticate('refresh', { session: false }), controllers.getTokenByRefreshToken)


module.exports = router;