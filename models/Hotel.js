const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    priceMultiplier: { type: Number, default: 1.0 },
    capacity: { type: Number, required: true },
    availabilityCount: { type: Number, required: true }
});

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amenities: [{
        type: String
    }],
    basePricePerNight: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }],
    roomTypes: [roomTypeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
