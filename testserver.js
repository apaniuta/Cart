const PORT = 3002;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const ZERO = 0;

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    if (path.extname(req.path).length > ZERO) {
        next();
    } else {
        req.url = '/index.html';
        next();
    }
});

app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('🌎  Listening on port %s', PORT);
    }
});