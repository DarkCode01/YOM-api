const { Schema, Model, SchemaTypes } = require('mongoose');


const MarketSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'This market needs a name!' ],
        unique: true
    },
    description: {
        type: String,
        required: [ true, 'This market needs a decription' ]
    },
    cover: {
        type: SchemaTypes.ObjectId,
        ref: 'Image',
        validateExistance: true,
        default: ''
    },
    address: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        required: true
    },
    managers: [{
        type: SchemaTypes.ObjectId,
        ref: 'Account',
        validateExistance: true,
        required: true
    }],
    employes: [{
        type: SchemaTypes.ObjectId,
        validateExistance: true,
        ref: 'Account'
    }],
    products: [{
        type: SchemaTypes.ObjectId,
        validateExistance: true,
        ref: 'Product'
    }]
});


module.exports = Model('Market', MarketSchema);