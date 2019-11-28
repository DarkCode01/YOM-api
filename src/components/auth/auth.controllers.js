const createError = require('http-errors');
const { createPayload, generateToken } = require('./auth.utils');


exports.getTokens = async (req, res, next) => {
    res.status(200);
    res.json({
        refresh: generateToken(createPayload(req.user, 'refresh')),
        access: generateToken(createPayload(req.user, 'access'))
    });
}

exports.getTokenByRefreshToken = async (req, res, next) => {
    res.status(200);
    res.json({
        access: generateToken(createPayload(req.user))
    });
}

exports.verifyToken = async (req, res, next) => {
    res.status(200);
    res.json({
        tokenType: req.user.tokenType,
        isValid: true
    });
}