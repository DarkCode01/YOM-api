const model = require('./account.model');
const controllers = require('./account.controllers');
const routes = require('./account.routes');
const utils = require('./account.utils');


module.exports = {
    model: model,
    controllers: controllers,
    routes: routes,
    utils: utils
}