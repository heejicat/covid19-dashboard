const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataEntrySchema = new Schema({
    new_cases: {
        type: Number,
        min: 0,
    },
    date: {
        type: Date,
    }
});

const DataEntry = mongoose.model('Data', dataEntrySchema);

module.exports = DataEntry;