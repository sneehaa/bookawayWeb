import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleHotelApi, bookHotelApi, deleteHotelApi } from "../apis/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/hotelDetails.css";
import BookingModal from "../components/BookingModal";

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !user) {
      toast.error("Please login to continue");
      navigate('/login?error=true');
    } else {
      fetchHotelDetails();
    }
  }, [hotelId]);

  const fetchHotelDetails = () => {
    getSingleHotelApi(hotelId)
      .then((res) => {
        if (res.data.success) {
          setHotelDetails(res.data.hotel);
          setIsBooked(res.data.hotel.isBooked);
        } else {
          console.error("Error fetching hotel details:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  };

  const handleBookNow = () => {
    if (isBooked) {
      deleteHotel();
    } else {
      setShowBookingModal(true);
    }
  };

  const bookHotel = (formData) => {
    bookHotelApi({
      userId: "userId",
      hotelId: hotelId,
      ...formData,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Hotel booked successfully");
          setIsBooked(true);
        } else {
          toast.error("Failed to book hotel");
        }
      })
      .catch((error) => {
        console.error("Error booking hotel:", error);
        toast.error("Failed to book hotel");
      });
  };

  const deleteHotel = () => {
    deleteHotelApi(hotelId)
      .then((res) => {
        if (res.data.success) {
          toast.success("Hotel unbooked successfully");
          setIsBooked(false);
        } else {
          toast.error("Failed to unbook hotel");
        }
      })
      .catch((error) => {
        console.error("Error unbooking hotel:", error);
        toast.error("Failed to unbook hotel");
      });
  };

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="hotel-details">
        <img src={hotelDetails.hotelImageUrl} alt={hotelDetails.hotelName} />
        <div className="hotel-info">
          <h2>Hotel Details</h2>
          <h3>{hotelDetails.hotelName}</h3>
          <p>Price: NPR.{hotelDetails.hotelPrice}</p>
          <p>Description: {hotelDetails.hotelDescription}</p>
          <p>Category: {hotelDetails.hotelCategory}</p>
          <button className="book-now" onClick={handleBookNow}>
            {isBooked ? "Booked" : "Book Now"}
          </button>
        </div>
      </div>
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSubmit={bookHotel}
        hotelId={hotelId}
      />
    </div>
  );
};

export default HotelDetailsPage;
