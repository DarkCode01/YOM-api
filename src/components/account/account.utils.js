const config = require('../../../config');
const brcrypt = require('bcryptjs');
const crypto = require('crypto-js');


exports.generateURLGravatarOfAccount = email => {
    const emailMD5 = crypto.MD5(email).toString();

    return `${config.GRAVATAR_URL}/${emailMD5}?d=retro`;
}

exports.createHashPassword = password => {
    const salt = brcrypt.genSaltSync(config.BCRYPT_SATL);
    const hash = brcrypt.hashSync(password, salt);

    return hash;
}