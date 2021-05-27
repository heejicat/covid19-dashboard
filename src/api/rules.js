const { Router } = require('express');
const CronJob = require('cron').CronJob;

const RuleEntry = require('../models/RuleEntry');
const getInfo = require('./getInfo');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await RuleEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

var job = new CronJob('0 17 * * *', async (req, res) => {
    const ruleEntry = new RuleEntry(await getInfo.getRegulation());
    const newUpdateDate = ruleEntry.date;
    
    if(await RuleEntry.countDocuments() != 0) {

        const entry = await RuleEntry.find();
        const DBDate = entry[0].date;
        const idFilter = { _id : entry[0]._id };
        
        if (newUpdateDate != DBDate) {
            const updateEntry = await RuleEntry.findOneAndUpdate( idFilter, ruleEntry, { 
                new: true,
                upsert: true
            });
        }

    } else {
        const newEntry = await ruleEntry.save();
    }
    
}, null, true, 'America/Los_Angeles');

job.start();

module.exports = router;