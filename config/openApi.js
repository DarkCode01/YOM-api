const YML = require('js-yaml');
const fs   = require('fs');

module.exports = YML.safeLoad(fs.readFileSync('./open-api.yml', 'utf8'));