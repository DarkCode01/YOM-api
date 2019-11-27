const { Schema, model, SchemaTypes } = require('mongoose');
const { createHashPassword, generateURLGravatarOfAccount } = require('./account.utils');


const AccountSchema = new Schema({
    gravatar: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: [true, 'hey yo, u need a username bro!'],
        unique: true,
        default: ''
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
    type: {
        type: String,
        enum: [ 'creator', 'employee' ],
        default: 'creator'
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: false
    },
    manager: {
        type: SchemaTypes.ObjectId,
        ref: 'Market',
        validateExistance: true,
        default: null
    },
    employed: {
        type: SchemaTypes.ObjectId,
        ref: 'Market',
        validateExistance: true,
        default: null
    },
    products_published: [{
        type: SchemaTypes.ObjectId,
        ref: 'Product',
        validateExistance: true,
        default: null
    }]
});

// Pre save model.
AccountSchema.pre('save', function(next) {
    this.gravatar = generateURLGravatarOfAccount(this.email);

    next();
});


module.exports = model('Account', AccountSchema);