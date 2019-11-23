const brcrypt = require('bcryptjs');
const crypto = require('crypto-js');


exports.generateURLGravatarOfAccount = email => {
    const emailMD5 = crypto.MD5(email).toString();

    return `${process.env.GRAVATAR_URL}/${emailMD5}?d=retro`;
}

exports.createHashPassword = password => {
    const salt = brcrypt.genSaltSync(process.env.BCRYPT_SALT);
    const hash = brcrypt.hashSync(password, salt);

    return hash;
}