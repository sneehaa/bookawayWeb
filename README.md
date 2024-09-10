# Bookaway Application
Welcome to the Bookaway application! This repository contains the complete codebase (both frontend and backend) for the Bookaway platform, which allows users to search for and book accommodations for their travel adventures.

## Features
### Frontend:
- User Authentication: Secure login, registration, password reset with OTP.
- Search & Discover: Browse and filter lodging options globally.
- Interactive UI: Intuitive layout for easy booking.

### Backend:
- User Management: Registration, login, OTP-based password reset.
- Booking Management: APIs for searching lodgings and managing bookings.
- Admin Panel: Manage properties, bookings, and user roles.
- Security: JWT authentication, OTP verification via Nodemailer.

## Technologies
### Frontend:
- React, Redux, React Router, Axios, Bootstrap.
### Backend:
- Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer.

## Setup Instructions
### Frontend:
#### 1. Clone the Repository:
```bash
git clone https://github.com/st6003/frontend-31b-sneehaa.git
```
#### 2. Install Dependencies
```bash
npm install
```
#### 3. Run
```bash
npm start
```

### Backend:
#### 1. Install Dependencies
```bash
npm install
```
#### 2. Run
```bash
npm start
```

### Key API Endpoints
#### User
-  **POST** `/api/user/register` - Register a new user.
- **POST** `/api/user/login` - Log in a user.
- **GET** `/api/user/profile/:userId` - Get user profile (admin only).
- **GET** `/api/user/getAll` - Get all users (admin only).
- **PUT** `/api/user/edit/:userId` - Edit user profile (admin only).
- **POST** `/api/send-otp` - Send OTP (authenticated users).
- **POST** `/api/verify-otp-and-update-password` - Verify OTP and update password (authenticated users).

#### Hotel
- **POST** `/api/hotel/create_hotel` - Create a new hotel (admin only).
- **GET** `/api/hotel/get_hotels` - Get all hotels.
- **GET** `/api/hotel/get_hotel/:id` - Get a hotel by ID.
- **PUT** `/api/hotel/update_hotel/:id` - Update hotel (admin only).
- **DELETE** `/api/hotel/delete_hotel/:id` - Delete a hotel (admin only).

#### Booking
- **POST** `/api/booking/book_hotel/:hotelId` - Book a hotel.
- **DELETE** `/api/booking/delete_booking/:id` - Delete a booking.
- **GET** `/api/booking/my-bookings` - Get user's bookings.
