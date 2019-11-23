const passport = require('passport');
const auth = require('./auth.routes');
const account = require('./account.routes');
const product = require('./product.routes');


module.exports = {
    auth: auth,
    account: account,
    product: product
}