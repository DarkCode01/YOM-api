/**
 *  TODO: hacer modelo para las categorias
 *  TODO: agregar validadores a los attr del modelo.
 * */

const { Schema, model, SchemaTypes } = require('mongoose');

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'hey bro, write the name of this product!'],
            default: ''
        },
        description: {
            type: String,
            required: true,
            default: ''
        },
        images: [{
            type: SchemaTypes.ObjectId,
            ref: 'Image',
            validateExistance: true
        }],
        price: {
            type: Number,
            required: true,
            default: 0.00
        },
        category: [{
            type: SchemaTypes.ObjectId,
            validateExistance: true,
            default: null
        }],
        saler: {
            type: SchemaTypes.ObjectId,
            ref: 'Account',
            validateExistance: true,
            required: [true, 'this product need it a saler!']
        },
        market: {
            type: SchemaTypes.ObjectId,
            ref: 'Market',
            validateExistance: true,
            required: false,
            default: null
        }
    },
    { versionKey: false }
);


module.exports = model('Product', ProductSchema);