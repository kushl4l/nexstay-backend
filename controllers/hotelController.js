const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res) => {
    try {
        const { location, minPrice, maxPrice, amenities } = req.query;
        let query = {};
        
        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        
        // Filter by price
        if (minPrice || maxPrice) {
            query.basePricePerNight = {};
            if (minPrice) query.basePricePerNight.$gte = Number(minPrice);
            if (maxPrice) query.basePricePerNight.$lte = Number(maxPrice);
        }
        
        // Filter by amenities
        if (amenities) {
            const amenitiesList = amenities.split(',').map(item => item.trim());
            query.amenities = { $all: amenitiesList };
        }
        
        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
