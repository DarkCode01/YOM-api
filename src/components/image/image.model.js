const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    public_id: {
        type: String,
        required: true,
        unique: true
    },
    format: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        default: ''
    },
    secure_url: {
        type: String,
        required: true,
        default: ''
    }
});

module.exports = model('Image', ImageSchema);