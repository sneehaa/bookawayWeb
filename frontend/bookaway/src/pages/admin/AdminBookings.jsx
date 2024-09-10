import React, { useState, useEffect } from 'react';
import { getAllBookingsApi } from '../../apis/Api';
import '../../styles/admin.css';
import AdminSidebar from './AdminSideBar';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getAllBookingsApi();
                if (response.data.success) {
                    setBookings(response.data.bookings);
                    setLoading(false);
                } else {
                    setError(response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                setError("Failed to fetch bookings.");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="admin-container">
            <AdminSidebar className="admin-sidebar" />
            <div className="table-container">
                <h2>Bookings</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Hotel ID</th>
                            <th>Hotel Name</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.userId}</td>
                                <td>{booking.hotelId}</td>
                                <td>{booking.hotelName}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookings;
