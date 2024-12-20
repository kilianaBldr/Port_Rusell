const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const mangodb = require('./db/mango');
//Déclaration de docsPath
const docsPath = path.join(__dirname, 'docs');

mangodb.initClientDbConnection();

const app = express();

app.use(
    cors({
        exposedHeaders: ['Authorization'],
        origin: '*',
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Sert la documentation avec Express
app.use('/docs', express.static(docsPath))

app.use('/', indexRouter);

app.use((req, res) => {
    res.status(404).json({
        name: 'API',
        version: '1.0',
        status: 404,
        message: 'non_trouvé',
    });
});

module.exports = app;
