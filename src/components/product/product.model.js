/**
 *  TODO: hacer modelo para las categorias
 *  TODO: agregar validadores a los attr del modelo.
 * */

const { Schema, model, SchemaTypes } = require('mongoose');

const ProductSchema = new Schema(
    {
        nomArt: {
            type: String,
            required: [true, 'hey bro, write the name of this product!'],
            default: ''
        },
        descripcion: {
            type: String,
            required: true,
            default: ''
        },
        images: [{
            type: SchemaTypes.ObjectId,
            ref: 'Image',
            validateExistance: true
        }],
        precio: {
            type: Number,
            required: true,
            default: 0.00
        },
        ctg: {
            type: String,
            required: true,
            default: 'all'
        },
        saler: {
            type: SchemaTypes.ObjectId,
            ref: 'Account',
            validateExistance: true,
            required: [true, 'this product need it a saler!'],
            default: ''
        }
    },
    { versionKey: false }
);


module.exports = model('Product', ProductSchema);