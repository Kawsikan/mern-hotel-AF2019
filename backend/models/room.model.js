const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
    },
    wing: {
        type: String,
        required: true,
        trim: true
    },
    pax: {
        type: Number,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'categories'
    }]
});

const Room = mongoose.model('rooms', RoomSchema);
module.exports = Room;