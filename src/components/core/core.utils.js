/**
 * Summary. (Core Utilities)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const fs = require('fs');
const hbs = require('handlebars');
const { param } = require('express-validator');

/** Validators of query params */
exports.validators = [
    param('objectID')
        .isMongoId()
];

exports.getTemplate = ({ filename }) => {
    const dirProject = process.cwd();
    const html = fs.readFileSync(`${dirProject}/src/templates/${filename}.hbs`, 'utf8');

    return hbs.compile(html)();
}