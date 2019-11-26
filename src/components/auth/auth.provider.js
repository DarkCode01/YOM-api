const utils = require('./auth.utils');
const controllers = require('./auth.controllers');
const routes = require('./auth.routes');
const middlewares = require('./auth.middlewares');

module.exports = {
    utils: utils,
    controllers: controllers,
    routes: routes,
    middlewares: middlewares
}