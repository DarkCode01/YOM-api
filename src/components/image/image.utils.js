const roi = require('resize-optimize-images');


exports.resizeImage = async (images) => {
    const options = {
        images: images,
        width: 640,
        quality: 90
    };
 
    // Run the module.
    return await roi(options);
};

