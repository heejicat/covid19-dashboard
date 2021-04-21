const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
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
},
() => console.log("\x1b[35m", "Database is connected....")); 

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.get('/', (req, res) => {
    // res.json({
    //     message: 'Hello World!',
    // });
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/data', data);
app.use('/api/rules', rules);

// app.get('/*', (req, res) => {
// });


getInfo.getRegulation();

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})