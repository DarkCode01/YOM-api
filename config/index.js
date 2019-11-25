const env = require('dotenv').config();

module.exports = {
    VERSION_API_REST: process.env.VERSION_API_REST,
    MONGODB_URL: process.env.MONGODB_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    BCRYPT_SATL: Number(process.env.BCRYPT_SATL),
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    GRAVATAR_URL: process.env.GRAVATAR_URL,
    PORT: process.env.PORT
}