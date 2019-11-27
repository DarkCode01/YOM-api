/**
 * Summary. (Account Routes)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const { Router } = require('express');
const passport = require('passport');

const utils = require('./account.utils');
const controllers = require('./account.controllers');

const CoreComponent = require('../core/core.provider');

const router = Router();

/**
 * @api {GET} /api/accounts Get all Accounts
 * @apiName getAccounts
 * @apiGroup Account
 *
 * @apiSuccess (200) { count, accounts } Result of all accounts.
 * @apiError (500) {object} Internal server error.
 */
router.get(
    '/accounts',
    passport.authenticate('authenticate', { session: false }),
    controllers.getAccounts
);

/**
 * @api {GET} /api/accounts/:objectID Get info Account by Object ID
 * @apiName getInfoAccount
 * @apiGroup Account
 *
 * @apiParam {string} [objectID] ObjectID is the id of mongoose.
 * 
 * @apiSuccess (200) { count, accounts } result of info.
 * @apiError (500) {object} Internal server error.
 */
router.get(
    '/accounts/:objectID',
    passport.authenticate('authenticate', { session: false }),
    CoreComponent.utils.validators,
    CoreComponent.middlewares.validate,
    controllers.getInfoAccount
);

/**
 * @api {POST} /api/accounts Create new Accounts
 * @apiName createAccount
 * @apiGroup Account
 *
 * @apiParam {String} [username]
 * @apiParam {string} [firts_name]
 * @apiParam {string} [last_name]
 * @apiParam {string} [email]
 * @apiParam {string} [password]
 * @apiParam {`mongoose.SchemaTypes.ObjectID`} [market_id] (optional) Send when account is an employee.
 * 
 * @apiSuccess (200) object Info of `Account` created.
 * @apiError (400) {object} Error on body params.
 * @apiError (500) {object} Internal server error.
 */
router.post(
    '/accounts',
    utils.bodyValidatorToUpdate,
    CoreComponent.middlewares.validate,
    controllers.createAccount
);

/**
 * @api {POST} /api/accounts Update Account
 * @apiName updateAccount
 * @apiGroup Account
 *
 * @apiParam {String} [username]
 * @apiParam {string} [firts_name]
 * @apiParam {string} [last_name]
 * @apiParam {string} [email]
 * 
 * @apiSuccess (200) object Info of `Account` updated.
 * @apiError (400) {object} Error on body params.
 * @apiError (500) {object} Internal server error.
 */
router.patch(
    '/accounts/:objectID',
    passport.authenticate('authenticate', { session: false }),
    CoreComponent.middlewares.validateAccount,
    utils.bodyValidatorToUpdate,
    CoreComponent.middlewares.validate,
    controllers.updateAccount
);

/**
 * @api {POST} /api/accounts Manage Status of account (Active / Inactive).
 * @apiName statusAccount
 * @apiGroup Account
 *
 * @apiParam {string} [objectID] ObjectID is the id of mongoose.
 * 
 * @apiSuccess (200) object Account desactivated.
 * @apiError (400) {object} Error on body params.
 * @apiError (500) {object} Internal server error.
 */
router.patch('/accounts/:objectID/status',
    passport.authenticate('authenticate', { session: false }),
    CoreComponent.middlewares.validateAccount,
    CoreComponent.utils.validators,
    CoreComponent.middlewares.validate,
    controllers.statusAccount
);

module.exports = router;