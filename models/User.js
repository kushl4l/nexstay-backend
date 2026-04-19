const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    preferences: {
        type: Map,
        of: String,
        default: {}
    },
    searchHistory: [{
        type: String
    }],
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
