const ImageComponent = require('../../src/components/image/image.provider');

module.exports = {
    delete: async (objectID) => {
        return await ImageComponent.model.deleteOne({ _id: objectID });
    }
}