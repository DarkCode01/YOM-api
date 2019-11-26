/**
 * Summary. (Core Utilities)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const { body } = require('express-validator');

exports.validators = [
    body('objectID')
        .isMongoId()
];