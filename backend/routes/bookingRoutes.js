const express = require("express");
const router = express.Router();
const {
  bookHotel,
  deleteBooking,
  getBookings,
} = require("../controllers/bookingController");
const { authGuard } = require("../middleware/authGuard");

// Route to create a new booking
router.post("/book_hotel/:hotelId", authGuard, bookHotel);

router.delete("/delete_booking/:id", authGuard, deleteBooking);

router.get("/my-bookings", authGuard, getBookings)

module.exports = router;
