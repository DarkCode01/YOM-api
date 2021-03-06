const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const passport = require('passport');
const Account = require('../account/account.provider').model;
const { SECRET_KEY_API } = require('./auth.utils');

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
                if (!account.status) await Account.updateOne(
                    { _id: account._id },
                    { is_active: true }
                );
                
                return next(null, account);
            }
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
        if (payload.tokenType === 'access') return next(false, payload);

        return next(createError(401, 'token invalid or expired!'));
    }
));

passport.use('refresh', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        secretOrKey: SECRET_KEY_API
    },
    (payload, next) => {
        if (payload.tokenType === 'refresh') {
            return next(false, {
                tokenType: payload.type,
                _id: payload._id,
                username: payload.username,
                email: payload.email
            });
        }

        return next(createError(401));
    }
));

passport.use('verify', new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: SECRET_KEY_API
    },
    (payload, next) => {
        return next(false, payload);
    }
));


module.exports = passport;