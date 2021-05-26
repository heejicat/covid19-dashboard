const { Router } = require('express');
const schedule = require('node-schedule');

const DataEntry = require('../models/DataEntry');
const getInfo = require('./getInfo');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        // get new cases and date data
        const entries = await DataEntry.find().sort({date:-1});
        res.json(entries);
    } catch (error) {
        next(error);
    }

    schedule.scheduleJob('*/2 * * * *', async (req, res) => {
        try {
            const dataEntry = new DataEntry(await getInfo.getCovidData());
            // const createdEntry = await dataEntry.save();
            console.log(dataEntry);
    
            res.json(createdEntry);
        } catch (err) {
            console.log(err);
        }
    
    });
});


   

module.exports = router;