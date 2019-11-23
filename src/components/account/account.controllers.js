const { Router } = require('express');
const Account = require('./account.model');
const createError = require('http-errors');
const passport = require('passport');

const router = Router();

/** 
 * TODO: Crear la cuenta del usuario.
 * TODO: Enviar un email al usuario para verificar la cuenta de email.
 * 
*/

exports.getAccounts = async (req, res, next) => {
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