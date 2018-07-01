const express = require('express');
const api = require('./routes/api');
const admin = require('./routes/admin');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, '../public')));
//convert json to object && accept data inside of URL
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/admin', admin);
app.use('/api', api);

module.exports = app;
