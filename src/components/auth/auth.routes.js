const { Router } = require('express');
const controllers = require('./auth.controllers');
const passport = require('passport');

const router = Router();


/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/auth/verify', passport.authenticate('verify', { session: false }), controllers.verifyToken)
    // .post('/auth/token', passport.authenticate('login', { session: false }), controllers.getTokens)
    // .post('/auth/refresh', passport.authenticate('refresh', { session: false }), controllers.getTokenByRefreshToken)


module.exports = router;