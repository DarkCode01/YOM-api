const crypto = require('crypto-js');

exports.generateURLGravatarOfAccount = email => {
    const emailMD5 = crypto.MD5(email).toString();

    return `${process.env.GRAVATAR_URL}/${emailMD5}?d=retro`;
}