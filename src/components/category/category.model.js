const { SchemaTypes, Schema, Model } = require('mongoose');


const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    products: [{
        type: SchemaTypes.ObjectId,
        ref: 'Product'
    }]
});


module.exports = Model('Category', CategorySchema);