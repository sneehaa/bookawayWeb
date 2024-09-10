import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHotelsApi } from '../apis/Api';
import '../styles/hotels.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
    getAllHotelsApi()
      .then((res) => {
        if (res.data && res.data.hotelss) {
          setHotels(res.data.hotelss);
        } else {
          console.error('No hotels found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  };

  const handleCardClick = (hotelId) => {
    navigate(`/hotel-details/${hotelId}`); 
  };


  return (
    <div>
      <div>
        <h2>Featured</h2>
        <div className="hotels-container">
          {hotels
            .filter((hotel) => hotel.hotelCategory === 'featured')
            .map((hotel) => (
              <div key={hotel._id} className="hotel-card" onClick={() => handleCardClick(hotel._id)}>
                <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="hotel-image" />
                <div className="hotel-details">
                  <h3>{hotel.hotelName}</h3>
                  <p>Price: NPR.{hotel.hotelPrice}</p>
                  <p>Description: {hotel.hotelDescription}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Popular Destinations</h2>
        <div className="hotels-container">
          {hotels
            .filter((hotel) => hotel.hotelCategory === 'popular')
            .map((hotel) => (
              <div key={hotel._id} className="hotel-card" onClick={() => handleCardClick(hotel._id)}>
                <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="hotel-image" />
                <div className="hotel-details">
                  <h3>{hotel.hotelName}</h3>
                  <p>Price: NPR.{hotel.hotelPrice}</p>
                  <p>Description: {hotel.hotelDescription}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
