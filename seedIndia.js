const mongoose = require('mongoose');
require('dotenv').config();
const Hotel = require('./models/Hotel');

const cities = [
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Delhi', state: 'Delhi' },
    { city: 'Bangalore', state: 'Karnataka' },
    { city: 'Goa', state: 'Goa' },
    { city: 'Jaipur', state: 'Rajasthan' },
    { city: 'Udaipur', state: 'Rajasthan' },
    { city: 'Chennai', state: 'Tamil Nadu' },
    { city: 'Hyderabad', state: 'Telangana' },
    { city: 'Kolkata', state: 'West Bengal' },
    { city: 'Pune', state: 'Maharashtra' },
    { city: 'Kochi', state: 'Kerala' },
    { city: 'Agra', state: 'Uttar Pradesh' },
    { city: 'Varanasi', state: 'Uttar Pradesh' },
    { city: 'Shimla', state: 'Himachal Pradesh' },
    { city: 'Manali', state: 'Himachal Pradesh' },
    { city: 'Rishikesh', state: 'Uttarakhand' },
    { city: 'Mysore', state: 'Karnataka' },
    { city: 'Jodhpur', state: 'Rajasthan' },
    { city: 'Amritsar', state: 'Punjab' },
    { city: 'Darjeeling', state: 'West Bengal' },
    { city: 'Ooty', state: 'Tamil Nadu' },
    { city: 'Munnar', state: 'Kerala' },
    { city: 'Chandigarh', state: 'Chandigarh' },
    { city: 'Ahmedabad', state: 'Gujarat' },
    { city: 'Jaisalmer', state: 'Rajasthan' },
    { city: 'Bhopal', state: 'Madhya Pradesh' },
    { city: 'Indore', state: 'Madhya Pradesh' },
    { city: 'Leh', state: 'Ladakh' },
    { city: 'Gangtok', state: 'Sikkim' },
    { city: 'Pondicherry', state: 'Puducherry' },
];

const hotelPrefixes = [
    'The Grand', 'Hotel Royal', 'Taj', 'The Oberoi', 'ITC',
    'The Leela', 'Radisson', 'Marriott', 'Hyatt', 'Novotel',
    'The Park', 'Vivanta', 'JW', 'Trident', 'Ramada',
    'Clarks', 'Fortune', 'Lemon Tree', 'Treebo', 'FabHotel',
    'WelcomHotel', 'The Lalit', 'Sarovar', 'Pride', 'Sterling',
    'Country Inn', 'Ginger', 'The Fern', 'Zone By The Park', 'Lords',
];

const hotelSuffixes = [
    'Palace', 'Residency', 'Inn', 'Suites', 'Resort',
    'Heritage', 'Grand', 'Plaza', 'Tower', 'Retreat',
];

const amenitySets = [
    ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'parking', 'room service', 'concierge'],
    ['wifi', 'pool', 'restaurant', 'parking', 'laundry', 'room service'],
    ['wifi', 'gym', 'restaurant', 'business center', 'parking', 'conference room'],
    ['wifi', 'pool', 'spa', 'beach access', 'restaurant', 'bar', 'water sports'],
    ['wifi', 'restaurant', 'parking', 'garden', 'temple nearby'],
    ['wifi', 'spa', 'yoga center', 'meditation hall', 'organic restaurant', 'nature trails'],
    ['wifi', 'pool', 'kids play area', 'restaurant', 'parking', 'pet friendly'],
    ['wifi', 'heritage walk', 'cultural shows', 'restaurant', 'rooftop dining', 'parking'],
    ['wifi', 'mountain view', 'bonfire', 'trekking', 'restaurant', 'hot water'],
    ['wifi', 'river view', 'adventure sports', 'yoga', 'cafe', 'camping'],
];

const descriptionTemplates = [
    (name, city) => `${name} is a premium luxury hotel in the heart of ${city}, offering world-class amenities, fine dining, and impeccable service. Perfect for business travelers and discerning guests seeking the finest hospitality experience. Every room features elegant interiors with modern comforts.`,
    (name, city) => `Experience the charm of ${city} at ${name}. This beautifully designed property combines traditional Indian aesthetics with modern luxury. Guests enjoy spacious rooms, curated dining experiences, and a tranquil spa that rejuvenates mind and body.`,
    (name, city) => `Nestled in a prime location in ${city}, ${name} offers breathtaking views, luxurious rooms, and a rooftop restaurant serving authentic local cuisine. Ideal for couples and families looking for a memorable getaway with top-notch hospitality.`,
    (name, city) => `${name} brings affordable luxury to ${city}. With stylish rooms, complimentary breakfast, high-speed internet, and a friendly staff, this hotel is perfect for young professionals and budget-conscious travelers who don't want to compromise on quality.`,
    (name, city) => `A heritage property in ${city}, ${name} takes you back in time with its royal architecture and regal interiors. Yet every modern comfort is at your fingertips — from spa treatments to gourmet dining and guided cultural tours of the city.`,
    (name, city) => `Discover serenity at ${name}, a boutique retreat in ${city}. Surrounded by lush greenery, this eco-friendly hotel features yoga sessions, organic farm-to-table dining, and nature walks. A perfect escape from the chaos of city life.`,
    (name, city) => `${name} in ${city} is a modern business hotel offering state-of-the-art conference facilities, high-speed connectivity, and executive suites. After a productive day, unwind at the rooftop bar or rejuvenate at the in-house wellness center.`,
    (name, city) => `Located steps away from ${city}'s top attractions, ${name} is the ideal base for exploring the city. The hotel features comfortable rooms, a multi-cuisine restaurant, and a helpful travel desk that can arrange tours and day trips.`,
    (name, city) => `${name} offers a unique blend of adventure and relaxation in ${city}. Whether you want to explore local markets, try thrilling outdoor activities, or simply relax by the pool with a cocktail, this property has something for everyone.`,
    (name, city) => `Welcome to ${name}, a family-friendly hotel in ${city} with spacious suites, a kids' play zone, and multiple dining options. The warm hospitality and thoughtful amenities make it a favorite among families and group travelers.`,
];

// Curated hotel exterior images (real Unsplash photos of hotels)
const hotelExteriorImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&h=600&fit=crop',
];

// Curated hotel room interior images
const roomImages = [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618773928121-c32f5e585eda?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
];

function generateHotels() {
    const hotels = [];
    let id = 0;

    // 30 cities × 10 hotels each = 300 hotels
    for (const loc of cities) {
        for (let i = 0; i < 10; i++) {
            id++;
            const prefix = hotelPrefixes[(id - 1) % hotelPrefixes.length];
            const suffix = hotelSuffixes[i % hotelSuffixes.length];
            const name = `${prefix} ${suffix}`;

            // Price tiers
            const tier = i % 5;
            let basePrice;
            switch(tier) {
                case 0: basePrice = 1800 + Math.floor(Math.random() * 1200); break;  // Budget
                case 1: basePrice = 3500 + Math.floor(Math.random() * 2500); break;  // Economy
                case 2: basePrice = 6000 + Math.floor(Math.random() * 4000); break;  // Mid
                case 3: basePrice = 10000 + Math.floor(Math.random() * 5000); break; // Premium
                case 4: basePrice = 18000 + Math.floor(Math.random() * 12000); break;// Luxury
                default: basePrice = 5000;
            }

            const rating = parseFloat((3.2 + Math.random() * 1.8).toFixed(1));
            const amenities = amenitySets[(id - 1) % amenitySets.length];
            const description = descriptionTemplates[(id - 1) % descriptionTemplates.length](name, loc.city);

            const mainImage = hotelExteriorImages[(id - 1) % hotelExteriorImages.length];
            const room1 = roomImages[(id - 1) % roomImages.length];
            const room2 = roomImages[(id + 4) % roomImages.length];

            let roomTypes;
            if (tier <= 1) {
                roomTypes = [
                    { type: 'Standard', priceMultiplier: 1.0, capacity: 2, availabilityCount: 20 },
                    { type: 'Deluxe', priceMultiplier: 1.3, capacity: 3, availabilityCount: 10 },
                ];
            } else if (tier === 2) {
                roomTypes = [
                    { type: 'Standard', priceMultiplier: 1.0, capacity: 2, availabilityCount: 15 },
                    { type: 'Deluxe', priceMultiplier: 1.4, capacity: 3, availabilityCount: 8 },
                    { type: 'Suite', priceMultiplier: 1.8, capacity: 4, availabilityCount: 4 },
                ];
            } else if (tier === 3) {
                roomTypes = [
                    { type: 'Deluxe', priceMultiplier: 1.0, capacity: 2, availabilityCount: 12 },
                    { type: 'Premium Suite', priceMultiplier: 1.5, capacity: 4, availabilityCount: 6 },
                    { type: 'Presidential Suite', priceMultiplier: 2.5, capacity: 6, availabilityCount: 2 },
                ];
            } else {
                roomTypes = [
                    { type: 'Luxury Room', priceMultiplier: 1.0, capacity: 2, availabilityCount: 10 },
                    { type: 'Royal Suite', priceMultiplier: 2.0, capacity: 4, availabilityCount: 4 },
                    { type: 'Maharaja Suite', priceMultiplier: 3.0, capacity: 6, availabilityCount: 1 },
                ];
            }

            hotels.push({
                name,
                location: `${loc.city}, ${loc.state}`,
                description,
                amenities,
                basePricePerNight: basePrice,
                rating,
                images: [mainImage, room1, room2],
                roomTypes,
            });
        }
    }

    return hotels;
}

const hotels = generateHotels();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB Atlas');
        
        // Only clear hotels — preserve users and bookings
        await Hotel.deleteMany();
        console.log('🗑️  Cleared existing hotels');

        await Hotel.insertMany(hotels);
        console.log(`✅ Successfully seeded ${hotels.length} hotels across ${cities.length} Indian cities!`);
        
        console.log('\n📋 City breakdown:');
        cities.forEach(c => {
            const count = hotels.filter(h => h.location.startsWith(c.city)).length;
            console.log(`   📍 ${c.city} — ${count} hotels`);
        });
        
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error:', error.message);
        process.exit(1);
    });
