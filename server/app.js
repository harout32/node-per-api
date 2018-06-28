const express    = require('express');
const api        = require('./routes/api');
const admin      = require('./routes/admin');
const app        = express();
const bodyParser = require('body-parser');
const path       = require('path');

// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'pug');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
)
app.use(express.static(path.join(__dirname, '../public')));
//convert json to object && accept data inside of URL
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use('/admin', admin);
app.use('/api', api);

module.exports = app;
