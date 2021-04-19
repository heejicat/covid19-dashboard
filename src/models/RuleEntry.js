const mongoose = require('mongoose');

const { Schema } = mongoose;

const ruleEntrySchema = new Schema({
    _id: {
        type: Number,
        default: 1
    },
    restriction: {
        type: String,
        required: true
    },
    date: {
        type: String,
    }
});

const RuleEntry = mongoose.model('Rule', ruleEntrySchema);

module.exports = RuleEntry;