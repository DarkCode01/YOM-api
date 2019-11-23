const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const passport = require('passport');
const { Account } = require('../models');
const { SECRET_KEY_API } = require('../utils/authentication');

const localStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy } = require('passport-jwt');


passport.use('login', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, next) => {
        try {
            const account = await Account.findOne({ email: email });
            const isValidPassword = bcrypt.compareSync(password, account.password);

            if (account && isValidPassword) {
                return next(null, account);
            }

            throw new Error();
        } catch(err) {
            return next(createError(401, 'Error not found an account with this data!'));
        }
    }
));

passport.use('authenticate', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: SECRET_KEY_API
    },
    (payload, next) => {
        try {
            if (payload.tokenType === 'access') return next(false, payload);

            return next(createError(401, 'token invalid or expired!'));
        } catch(err) {
            return next(createError(500, err.message));
        }
    }
));

passport.use('refresh', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        secretOrKey: SECRET_KEY_API
    },
    (payload, next) => {
        try {
            if (payload.tokenType !== 'refresh') return next(createError(401, 'token invalid or expired!'));

            return next(false, {
                tokenType: payload.type,
                _id: payload._id,
                username: payload.username,
                email: payload.email
            });
        } catch(err) {
            return next(createError(500, err.message));
        }
    }
));

passport.use('verify', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        secretOrKey: SECRET_KEY_API
    },
    (payload, next) => {
        return next(false, payload);
    }
))


module.exports = passport;