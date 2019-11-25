const config = require('./config');
const db = require('./config/db');
const app = require('./src/app');

app.listen(config.PORT|| 8000, async () => {
    await db.connect();

    console.log(`Server running on http://localhost:${config.PORT || 8000}`);
});