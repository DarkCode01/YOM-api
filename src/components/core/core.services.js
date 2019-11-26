/**
 * Summary. (Serveices Core)
 *
 * Description. (This file contain all configuration of third serviveces cloud.)
 *
 * @author Jose Segura (Darkcoder)
 * @since  26.11.19
 */

const sendgrid = require('@sendgrid/mail');
const cloudinary = require('cloudinary').v2;
const config = require('../../../config');

// Initializate cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

// Init Sendgrid
sendgrid.setApiKey(config.SENDGRID_API_KEY);


exports.cloudinary = cloudinary;
exports.sendgrid = sendgrid;