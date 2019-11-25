const config = require('../../../config');
const jwt = require('jsonwebtoken');


exports.SECRET_KEY_API = config.SECRET_KEY;

exports.getExpiredIn = (type) => {
    switch(type) {
        case 'refresh':
            return '12h';
        default:
            return '1h';
    }
}

exports.createPayload = ({ _id, username, email }, tokenType='access') => {
    return { tokenType, _id, username, email };
};

exports.generateToken = (data) => {
    return jwt.sign(data, this.SECRET_KEY_API, {
        expiresIn: this.getExpiredIn(data.tokenType)
    });
}