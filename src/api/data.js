const { Router } = require('express');
const schedule = require('node-schedule');

const DataEntry = require('../models/DataEntry');
const getInfo = require('./getInfo');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await DataEntry.find().sort({date:-1});
        console.log("entries = " + entries);
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

schedule.scheduleJob('0 17 * * *', async (req, res) => {
    const dataEntry = new DataEntry(await getInfo.getCovidData());
    const createdEntry = await dataEntry.save();

    res.json();
});
   

module.exports = router;