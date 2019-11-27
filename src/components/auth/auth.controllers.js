const createError = require('http-errors');
const { createPayload, generateToken } = require('./auth.utils');


exports.getTokens = async (req, res, next) => {
    try {
        res.status(200);
        res.json({
            refresh: generateToken(createPayload(req.user, 'refresh')),
            access: generateToken(createPayload(req.user, 'access'))
        });
    } catch(err) {
        return next(createError(500, err.message));
    }
}

exports.getTokenByRefreshToken = async (req, res, next) => {
    try {
        res.status(200);
        res.json({
            access: generateToken(createPayload(req.user))
        });
    } catch(err) {
        return next(createError(500, err.message));
    }
}

exports.verifyToken = async (req, res, next) => {
    try {
        res.status(200);
        res.json({
            tokenType: req.user.tokenType,
            isValid: true
        });
    } catch(err) {
        return next(createError(500, err.message));
    }
}