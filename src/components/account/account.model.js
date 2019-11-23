const { Schema, model, SchemaTypes } = require('mongoose');
const { createHashPassword } = require('../utils/password');
const { generateURLGravatarOfAccount } = require('../utils/account');


const AccountSchema = new Schema({
    gravatar: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: [true, 'hey yo, u need a username bro!'],
        unique: true
    },
    firts_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, 'where is u email man?'],
        unique: true,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'is it a joke, u need a pass xD'],
        set: createHashPassword,
        default: ''
    },
    email_confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    products: [{
        type: SchemaTypes.ObjectId,
        ref: 'Product',
        validateExistance: true,
        default: ''
    }]
});

// Pre save model.
AccountSchema.pre('save', function(next) {
    this.gravatar = generateURLGravatarOfAccount(this.email);

    next();
});


module.exports = model('Account', AccountSchema);