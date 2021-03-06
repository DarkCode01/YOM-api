/**
 * Summary. (Account Controllers)
 *
 * Description. (Controllers to manage all user's accounts.)
 *
 * @link   /api/accounts
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const createError = require('http-errors');
const Account = require('./account.model');

const CoreComponent = require('../core/core.provider');


exports.getAccounts = async (req, res, next) => {
    /**
     * [This function get a query-params to search all accounts
     *  with thoses values]
     *
     *@return {{ number, [Account] }} { count, accounts }
     */
    const accounts = await Account
        .find({})
        .select('-password -email_confirmed -__v');

    res.status(200);
    res.json({
        count: accounts.length,
        results: accounts
    });
}

exports.getInfoAccount = async (req, res, next) => {
    const account = await Account
        .findById(req.params.objectID)
        .select('-password -__v -_id');

    res.status(200);
    res.json({
        account: account
    });
}

exports.createAccount = async (req, res, next) => {
    const account = new Account({ ...req.body });

    res.status(201);
    res.json({
        data: await account.save()
    });
}

exports.statusAccount = async (req, res, next) => {
    const account = await Account.findById(req.params.objectID);
    await Account.updateOne(
        { _id: req.user._id },
        { is_active: !account.is_active }
    );

    res.status(200);
    res.json({
        account: {
            ...account._doc,
            is_active: !account.is_active
        }
    });
}

exports.updateAccount = async (req, res, next) => {
    const account = await Account.findByIdAndUpdate(
        req.user._id,
        { ...req.body }
    );

    res.status(200);
    res.json({
        account: {
            ...account._doc,
            ...req.body
        }
    });
}