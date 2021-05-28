const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const middlewares = require('./src/middlewares');
const data = require('./src/api/data');
const rules = require('./src/api/rules');

const app = express();

// database connect
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/covid-19-dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("\x1b[35m", "Database is connected...."))
.catch( err => console.error('database err', err)); 

app.use(morgan('common'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// json data
app.use('/api/data', data);
app.use('/api/rules', rules);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})