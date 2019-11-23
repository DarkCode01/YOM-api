const createError = require('http-errors');
const { Types } = require('mongoose');


exports.validateObjectId = (req, res, next) => {
    const id = req.params.id || req.body.id;

    if (!Types.ObjectId.isValid(id)) return next(createError(400, 'The ObjectID passed is invalid.'));

    return next();
}