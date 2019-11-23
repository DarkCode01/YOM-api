const mongoose = require('mongoose');
const app = require('./src/app');


app.listen(process.env.PORT || 8000, async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    
    console.log(`Server running on http://localhost:${process.env.PORT || 8000}`);
});