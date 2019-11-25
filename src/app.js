const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
// const routes = require('./routes');
const passport = require('./components/core/core.controllers');

// Components
const AuthComponent = require('./components/auth/auth.provider');
const AccountComponent = require('./components/account/account.provider');
const ProductComponent = require('./components/product/product.provider');

// App
const app = express();

// settings...
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


// routes
app.use(`/api`, AuthComponent.routes);
app.use(`/api`, AccountComponent.routes);
app.use(`/api`, ProductComponent.routes);

// Catch of errors
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        statusCode: err.status,
        message: err.message,
        error: err
    });
});

module.exports = app;
