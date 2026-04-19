const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

exports.createBooking = async (req, res) => {
    const { hotelId, roomType, checkInDate, checkOutDate } = req.body;
    try {
        if (!hotelId || !roomType || !checkInDate || !checkOutDate) {
            return res.status(400).json({ message: 'Please provide all booking details' });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        // Calculate number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (nights <= 0) return res.status(400).json({ message: 'Check-out date must be after check-in date' });

        // Calculate price based on room type
        let multiplier = 1.0;
        if (hotel.roomTypes && hotel.roomTypes.length > 0) {
            const room = hotel.roomTypes.find(r => r.type === roomType);
            if (room) {
                multiplier = room.priceMultiplier;
            }
        }
        
        const totalPrice = hotel.basePricePerNight * multiplier * nights;

        const booking = await Booking.create({
            user: req.user.id, // from auth middleware
            hotel: hotelId,
            roomType,
            checkInDate,
            checkOutDate,
            totalPrice,
            status: 'Confirmed'
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('hotel', 'name location images rating');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
