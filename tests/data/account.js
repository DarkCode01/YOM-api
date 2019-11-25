const faker = require('faker');
const AuthComponent = require('../../src/components/auth/auth.provider');
const AccountComponent = require('../../src/components/account/account.provider');


module.exports = {
    create: async () => {
        const email = await faker.internet.email();
        const password = await faker.internet.password();

        const AccountFaker = new AccountComponent.model({
            username: faker.internet.userName(),
            firts_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: email,
            password: password
        });
        const data = await AccountFaker.save();

        return { email, password, data };
    },
    token: (account) => {
        return AuthComponent.utils.generateToken(
            AuthComponent.utils.createPayload(account)
        )
    },
    delete: async (objectID) => {
        await AccountComponent.model.deleteOne({ _id: objectID });
    }
}