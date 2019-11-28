const fs = require('fs');
const createError = require('http-errors');

const CoreComponent = require('../core/core.provider');
const ImageComponent = require('../image/image.provider');

const Product = require('./product.model');


exports.getProductByObjectId = async (req, res, next) => {
    const product = await Product.findById(req.params.objectID);
        
    res.status(200);
    res.json({ data: product });
}

exports.getProducts = async (req, res, next) => {
    const products = await Product.find({});

    res.status(200);
    res.json({
        count: products.length,
        results: products
    });
}

exports.createProduct = async (req, res, next) => {
    let uploades = [];

    for (let image of req.files) {
        const uploaded = await CoreComponent.services.cloudinary.uploader.upload(image.path);
        const deleted = fs.unlinkSync(image.path);
        const Image = new ImageComponent.model({
            public_id: uploaded.public_id,
            format: uploaded.format,
            url: uploaded.url,
            secure_url: uploaded.secure_url
        });
        const imageData = await Image.save();

        uploades.push(imageData._id);
    }

    // Create product...
    const product = new Product({
        saler: req.user._id,
        name: req.body.name,
        description: req.body.description,
        images: uploades,
        price: Number(req.body.price)
    });

    res.status(201);
    res.json({
        data: await product.save()
    });
}

exports.deleteProductByObjectId = async (req, res, next) => {
    const product = await Product.deleteOne({ _id: req.body.id });

    res.status(200);
    res.json({
        data: product
    });
}