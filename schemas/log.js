const mongoose = require('mongoose');

const { Schema } = mongoose;
const logSchema = new Schema({
    Date: {
        type: Date,
        default: () => Date.now() + 9 * 60 * 60 * 1000,
    },
    userId: {
        type: String,
        required: true,
    },
    screen: String,
    action: String,
    param: String,
    note: String,
});

module.exports = mongoose.model('Log', logSchema);
