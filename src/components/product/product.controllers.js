const fs = require('fs');
const createError = require('http-errors');
const mongoose = require('mongoose');
const CoreComponent = require('../core/core.provider');
const Product = require('./product.model');

const { cloudinary } = CoreComponent.services;

exports.getProductByObjectId = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        res.status(200);
        res.json({ data: product });
    } catch(err) {
        return next(createError(500));
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});

        res.status(200);
        res.json({
            count: products.length,
            results: products
        });
    } catch(err) {
        next(createError(500));
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        let uploades = [];

        for (let image of req.files) {
            const uploaded = await cloudinary.uploader.upload(image.path);
            const deleted = fs.unlinkSync(image.path);
            
            uploades.push(uploaded.secure_url || uploaded.url);
        }

        // Create product...
        const product = new Product({
            saler: req.user._id,
            nomArt: req.body.nomArt,
            descripcion: req.body.description,
            images: uploades,
            precio: Number(req.body.precio), 
            ctg: req.body.ctg
        });

        res.status(201);;
        res.json({
            data: await product.save()
        });
    } catch(err) {
        return next(createError(500));
    }
}

exports.deleteProductByObjectId = async (req, res, next) => {
    try {
        const product = await Product.deleteOne({ _id: req.body.id });

        res.status(200);
        res.json({
            data: product
        });
    } catch(err) {
        return next(createError(500));
    }
}