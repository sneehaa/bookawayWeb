import React, { useState } from 'react';
import BookingForm from '../pages/BookingForm';
import '../styles/booking.css'

const BookingModal = ({ isOpen, onClose, onSubmit, hotelId }) => {
    if (!isOpen) {
      return null;
    }
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose(); 
      }
    };
  
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <h2>Book Hotel</h2>
          {/* Pass setShowBookingModal to BookingForm */}
          <BookingForm onSubmit={onSubmit} setShowBookingModal={onClose} hotelId = {hotelId}/>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
      </div>
    );
  };
  

export default BookingModal;
