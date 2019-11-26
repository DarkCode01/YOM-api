/**
 * Summary. (Account Controllers)
 *
 * Description. (Controllers to manage all user's accounts.)
 *
 * @link   /api/accounts
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const Account = require('./account.model');
const createError = require('http-errors');


exports.getAccounts = async (req, res, next) => {
    /**
     * [This function get a query-params to search all accounts
     *  with thoses values]
     *
     *@return {{ number, [Account] }} { count, accounts }
     */
    try {
        const accounts = await Account
            .find({})
            .select('-password -email_confirmed -__v');

        res.status(200);
        res.json({
            count: accounts.length,
            results: accounts
        });
    } catch(err) {
        return next(createError(500), err.message);
    }
}

exports.getInfoAccount = async (req, res, next) => {
    try {
        const account = await Account
            .findById(req.params.objectID)
            .select('-password -__v -_id');

        res.status(200);
        res.json({
            account: account
        });
    } catch(err) {
        return next(createError(500), err.message);
    }
}

exports.createAccount = async (req, res, next) => {
     try {
        const account = new Account({ ...req.body });

        res.status(201);
        res.json({
            data: await account.save()
        });
    } catch(err) {
        return next(createError(400, err.message));
    }
}

exports.desactivateAccount = async (req, res, next) => {
    try {
        console.log(req.user);
    } catch(err) {
        return next(createError(500), err.message);
    }
}