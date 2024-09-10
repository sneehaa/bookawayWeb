// importing axios
import axios from "axios";

// Creating Axios instance
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
});

// configuration for axios
const config = {
    headers :{
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}

// Creating test API
export const testApi = () => Api.get("/test");

// Creating register API
export const registerApi = (data) => Api.post("/api/user/register", data);

// Creating login API
export const loginApi = (data) => Api.post("/api/user/login", data);

export const getUserProfileApi = (userId) => Api.get(`/api/user/profile/${userId}`);

// creating hotel API
export const createHotelApi = (formData) => Api.post('/api/hotel/create_hotel', formData, config);

// creating get hotels API
export const getAllHotelsApi = () => Api.get('/api/hotel/get_hotels');

// creating get single hotel API
export const getSingleHotelApi = (id) => Api.get(`/api/hotel/get_hotel/${id}`);

// updating hotel
export const updateHotelApi = (id, formData) => Api.put(`/api/hotel/update_hotel/${id}`, formData, config);

// deleting hotel
export const deleteHotelApi = (id) => Api.delete(`/api/hotel/delete_hotel/${id}`, config);

// booking hotel
export const bookHotelApi = (hotelId, formData) => Api.post(`/api/booking/book_hotel/${hotelId}`, formData, config);

// deleting booking
export const deleteBookingApi = (id) => Api.delete(`/api/booking/delete_booking/${id}`, config);

//fetching all bookings
export const getAllBookingsApi = () => Api.get('/api/booking/my-bookings', config);

//forget Password
export const forgetApi = (data) => Api.post("/api/auth/forgot-password", data)

//reset password
export const resetApi = (data) => Api.post("/api/auth/reset-password",data)

//getAllusers
export const getAllusers = (data) => Api.get("/api/user/getAll", config)

export default Api;
