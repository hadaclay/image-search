const express = require('express');

const imageSearch = require('./src/imageSearch');
const latestSearches = require('./src/latestSearches');
const app = express();

app.use(express.static('public'));
app.set('port', process.argv.PORT || 5000);

app.get('/search', (request, response) => response.json({"error": "no query supplied"}));
app.get('/search/:search?', imageSearch);
app.get('/latest', latestSearches);

app.listen(app.get('port'));