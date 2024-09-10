import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bookHotelApi } from "../apis/Api";
import "../styles/booking.css";

const BookingForm = ({ hotelId, setShowBookingModal }) => {
  const [formData, setFormData] = useState({
    hotelId: hotelId,
    numberOfRooms: 1,
    numberOfAdults: 1,
    numberOfChildren: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
  });

  

  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate > endDate) {
      setError("Check-out date must be after check-in date");
      return;
    }
    setFormData({
      ...formData,
      checkInDate: startDate,
      checkOutDate: endDate,
    });
    setShowCalendar(false);
    setError("");
  };

const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log({hotelId});
    const response = await bookHotelApi(hotelId, formData);

    if (response.data.success) {
      toast.success("Hotel booked successfully");
      setFormData({
        numberOfRooms: 1,
        numberOfAdults: 1,
        numberOfChildren: 0,
        checkInDate: new Date(),
        checkOutDate: new Date(),

      });
      setShowBookingModal(false);
    } else {
      toast.error("Failed to book hotel");
    }
  } catch (error) {
    console.error("Error booking hotel:", error);
    toast.error("Failed to book hotel");
  }
};


  return (
    <form onSubmit={handleFormSubmit} className="booking-form">
      <label>
        Number of Rooms:
        <input
          type="number"
          name="numberOfRooms"
          value={formData.numberOfRooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Adults:
        <input
          type="number"
          name="numberOfAdults"
          value={formData.numberOfAdults}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Children:
        <input
          type="number"
          name="numberOfChildren"
          value={formData.numberOfChildren}
          onChange={handleChange}
        />
      </label>
      <label>
        Days of Stay:
        <input
          type="text"
          name="daysOfStay"
          value={`${format(formData.checkInDate, "MM/dd/yyyy")} to ${format(
            formData.checkOutDate,
            "MM/dd/yyyy"
          )}`}
          onFocus={handleFocus}
          readOnly
        />
      </label>
      {showCalendar && (
        <DateRange
          editableDateInputs={true}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: formData.checkInDate,
              endDate: formData.checkOutDate,
              key: "selection",
            },
          ]}
          minDate={new Date()}
        />
      )}
      {error && <div className="error">{error}</div>}
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
