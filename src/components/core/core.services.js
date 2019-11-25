const config = require('../../../config');
const cloudinary = require('cloudinary').v2;


// Initializate cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

exports.cloudinary = cloudinary;