const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const swagger = require('swagger-ui-express');

// Components
const AuthComponent = require('./components/auth/auth.provider');
const AccountComponent = require('./components/account/account.provider');
const CoreComponent = require('./components/core/core.provider');
const ProductComponent = require('./components/product/product.provider');

// other
const openApi = require('../config/openApi.js');

// App
const app = express();

// settings...app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(AuthComponent.middlewares.initialize());


// routes
app.use('/api', AuthComponent.routes);
app.use('/api', AccountComponent.routes);
// app.use('/api', ProductComponent.routes);
app.use('/api/doc', swagger.serve, swagger.setup(openApi));

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
