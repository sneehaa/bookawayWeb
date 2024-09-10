const mongoose = require("mongoose");
const Hotel = require("../model/hotelModel");
const Booking = require("../model/bookingModel");

const bookHotel = async (req, res) => {
  const user = req.user
  const {
    hotelId,
    numberOfRooms,
    numberOfAdults,
    numberOfChildren,
    checkInDate,
    checkOutDate,
  } = req.body;
  

  try {
   //creating a booking form need for new booking
    const newBooking = new Booking({
      userId: user.id,
      hotelId,
      numberOfRooms,
      numberOfAdults,
      numberOfChildren,
      checkInDate,
      checkOutDate,
    });

    //saving the booking to our database
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Hotel booked successfully",
      booking: newBooking, 
    });
  } catch (error) {
    console.error("Error booking hotel:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Finding the booking by its id
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Removing the booking from the our database
    await booking.deleteOne();

    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, message: 'Failed to delete booking' });
  }
};


// Fetch all bookings
const getBookings = async (req, res) => {
  try {
    const userId = req.user.id; 
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again later.' });
  }
};


module.exports = {
  bookHotel,
  deleteBooking,
  getBookings
};
