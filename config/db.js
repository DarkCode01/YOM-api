const mongoose = require('mongoose');
const config = require('./index');

module.exports = {
    mongoose,
    connect: async () => {
        await mongoose.connect(config.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
    },
    disconnect: async (done) => {
        await mongoose.disconnect(done);
    }
}