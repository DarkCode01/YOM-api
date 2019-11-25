const faker = require('faker');
const ProductComponent = require('../../src/components/product/product.provider');

module.exports = {
    create: () => {
        return {
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            price: faker.commerce.price()
        }
    },
    delete: async (objectID) => {
        return await ProductComponent.model.deleteOne({ _id: objectID });
    }
}