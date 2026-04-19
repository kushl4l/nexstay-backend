const mongoose = require('mongoose');
require('dotenv').config();
const Hotel = require('./models/Hotel');

const hotels = [
    {
        name: 'Ocean View Resort',
        location: 'Miami, Florida',
        description: 'A beautiful resort right on the beach with a massive outdoor pool, spa, and incredible sunset views from your balcony.',
        amenities: ['beach', 'pool', 'spa', 'wifi'],
        basePricePerNight: 250,
        rating: 4.8,
        images: [],
        roomTypes: [
            { type: 'Standard', priceMultiplier: 1.0, capacity: 2, availabilityCount: 10 },
            { type: 'Ocean View Suite', priceMultiplier: 1.5, capacity: 4, availabilityCount: 5 }
        ]
    },
    {
        name: 'City Center Inn',
        location: 'New York City, NY',
        description: 'Located in the heart of the city, perfect for business trips and sightseeing. Steps away from Times Square and fine dining.',
        amenities: ['wifi', 'gym', 'business center'],
        basePricePerNight: 180,
        rating: 4.2,
        images: [],
        roomTypes: [
            { type: 'Standard', priceMultiplier: 1.0, capacity: 2, availabilityCount: 20 },
            { type: 'Executive King', priceMultiplier: 1.3, capacity: 2, availabilityCount: 8 }
        ]
    },
    {
        name: 'Mountain Retreat',
        location: 'Aspen, Colorado',
        description: 'Quiet mountain cabin style resort with private hiking trails, nature views, and a cozy fireplace in every room.',
        amenities: ['nature', 'hiking', 'fireplace', 'wifi'],
        basePricePerNight: 320,
        rating: 4.9,
        images: [],
        roomTypes: [
            { type: 'Cabin', priceMultiplier: 1.0, capacity: 2, availabilityCount: 15 },
            { type: 'Luxury Chalet', priceMultiplier: 2.0, capacity: 6, availabilityCount: 3 }
        ]
    },
    {
        name: 'Luxury Spa Hotel',
        location: 'Beverly Hills, CA',
        description: '5-star luxury hotel offering premium spa services, fine dining, valet parking, and an exclusive rooftop lounge.',
        amenities: ['spa', 'dining', 'luxury', 'valet', 'pool'],
        basePricePerNight: 500,
        rating: 5.0,
        images: [],
        roomTypes: [
            { type: 'Deluxe Room', priceMultiplier: 1.0, capacity: 2, availabilityCount: 12 },
            { type: 'Penthouse Suite', priceMultiplier: 3.0, capacity: 4, availabilityCount: 2 }
        ]
    },
    {
        name: 'Budget Backpackers',
        location: 'Austin, Texas',
        description: 'Affordable and lively hostel with free breakfast, high-speed internet, and a great social atmosphere for young travelers.',
        amenities: ['breakfast', 'wifi', 'bar'],
        basePricePerNight: 60,
        rating: 4.0,
        images: [],
        roomTypes: [
            { type: 'Shared Dorm', priceMultiplier: 1.0, capacity: 8, availabilityCount: 50 },
            { type: 'Private Room', priceMultiplier: 1.5, capacity: 2, availabilityCount: 10 }
        ]
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-booking')
    .then(async () => {
        console.log('Connected to MongoDB');
        await Hotel.deleteMany(); // Clear existing
        console.log('Cleared existing hotels');
        await Hotel.insertMany(hotels);
        console.log('Successfully seeded database with hotels!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    });
