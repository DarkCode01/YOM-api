const brcrypt = require('bcryptjs');

exports.createHashPassword = password => {
    const salt = brcrypt.genSaltSync(process.env.BCRYPT_SALT);
    const hash = brcrypt.hashSync(password, salt);

    return hash;
}