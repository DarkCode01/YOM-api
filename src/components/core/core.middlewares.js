/**
 * Summary. (Core Middlewares)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const createError = require('http-errors');
const { validationResult } = require('express-validator');

exports.validate = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) return next();

        return next(createError(400, errors.array()));
    } catch(err) {
        return next(createError(500, err.message));
    }
}

exports.validateAccount = async (req, res, next) => {
    if (req.user._id === req.params.objectID) {
        return next();
    }

    return next(createError(401));
}