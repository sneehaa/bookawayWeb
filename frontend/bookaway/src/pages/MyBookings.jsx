import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../apis/Api"; 

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Use the getAllBookingsApi function from your API file
      const response = await Api.getAllBookingsApi();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
    }
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {/* Render booking details here */}
            <p>Hotel ID: {booking.hotelId}</p>
            <p>Number of Rooms: {booking.numberOfRooms}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
