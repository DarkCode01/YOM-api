const roi = require('resize-optimize-images');
 
    const resize =async (images) => {
        const options = {
            images: images,
            width: 640,
            quality: 90
        };
     
        // Run the module.
        await roi(options);
    };
 module.exports= resize;

