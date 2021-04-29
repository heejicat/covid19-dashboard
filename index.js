const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const middlewares = require('./src/middlewares');
const data = require('./src/api/data');
const rules = require('./src/api/rules');
const getInfo = require('./src/api/getInfo');

const app = express();

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/covid-19-dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("\x1b[35m", "Database is connected...."))
.catch( err => console.error('database err', err)); 

app.use(morgan('common'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
    // res.json({
    //     message: 'Hello World!',
    // });
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('/api/data', data);
app.use('/api/rules', rules);

// getInfo.getRegulation();

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})