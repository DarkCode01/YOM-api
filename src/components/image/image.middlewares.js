const createError = require('http-errors');
const multer = require('multer');
const MIME_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg'
];

exports.upload = multer({
    dest: './.tmp',
    limits: 1000000,
    fileFilter: (req, file, next) => {
        if (!MIME_TYPES.includes(file.mimetype)) {
            return next(createError(400, 'Only .png, .jpg and .jpeg format allowed!'));
        }

        return next(null, true);
    } 
});

exports.limitFiles = (req, res, next) => {
    try {
        if (req.files.length < 1) return next(createError(400, 'The min of images is (1).'));
        if (req.files.length > 5) return next(createError(400, 'The max of images is (5).'));
    
        return next();
    } catch (err) {
        return next(createError(400, 'The min of images is (1).'));
    }
}