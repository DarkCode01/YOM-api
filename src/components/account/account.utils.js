/**
 * Summary. (Account Utilities)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const brcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const { body, param } = require('express-validator');

const config = require('../../../config');


/**
 * Summary. (Generator of gravatar URL)
 * 
 * Description. (This function is to genereate a hahs MD5 of Email
 *  and add this hash to URL of gravatars)
 * 
 * @param { string } email 
 */
exports.generateURLGravatarOfAccount = email => {
    /**
     * @return { string } gravatarURL [The url of gravatar of this email]
     */

    const emailMD5 = crypto.MD5(email).toString();

    return `${config.GRAVATAR_URL}/${emailMD5}?d=retro`;
}

/**
 * Summary. (Encrypt Password)
 * 
 * Description. (This function encrypt the password passed.)
 * 
 * @param { string } password Password to encrypt.
 */
exports.createHashPassword = password => {
    /**
     * @return {string} hash [Password hashed]
     */

    const salt = brcrypt.genSaltSync(config.BCRYPT_SATL);
    const hash = brcrypt.hashSync(password, salt);

    return hash;
}

/**
 * @param {string} type Thaths the type os validotr (body / query)
 * 
 * @return {array} validators.
 */
exports.bodyValidatorToUpdate = [
    body('username')
        .isAlphanumeric()
        .isLength({ min: 4, max: 30 })
        .withMessage('The characters of username is min: 4, max: 30')
        .optional(),
    body('firts_name')
        .isString()
        .matches(/^[a-zA-Z]/)
        .withMessage('Only contain letters.')
        .isLength({ min: 4, max: 30 })
        .withMessage('The characters of firts name is min: 4, max: 30')
        .optional(),
    body('last_name')
        .isString()
        .matches(/^[a-zA-Z]/)
        .withMessage('Only contain letters.')
        .isLength({ min: 4, max: 50 })
        .withMessage('The characters of last name is min: 4, max: 30')
        .optional(),
    body('email')
        .isEmail()
        .withMessage('The email supplied is invalid.')
        .optional()
];

exports.bodyValidatorToCreate = [
    ...this.bodyValidatorToUpdate,
    body('password')
        .isAlphanumeric()
        .isLength({ min: 8, max: 50 })
        .withMessage('They must be at least 8 characters minimum.')
        .matches(/^[a-zA-Z0-9]{3,30}$/)
        .withMessage('The password must have lyrics and numbers.'),
    body('market_id')
        .isMongoId()
        .withMessage('The market supplied not exist.')
        .optional()
];