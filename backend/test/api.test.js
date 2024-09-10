const request = require('supertest');
const app = require('../index');

describe('Hotel API Endpoints Test', () => {
    let token = ''; 
    // Test registering a user
    it('POST /api/user/register | Response should be json', async () => {
        const userData = {
            firstName: 'abc',
            lastName: 'cba',
            email: 'usersw@gmail.com',
            password: 'password123'
        };
        const response = await request(app).post('/api/user/register').send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBe(true);
    });

    // Test logging in a user
    it('POST /api/user/login | Response should be json', async () => {
        const userData = {
            email: 'cbaabcaa@gmail.com',
            password: 'password123'
        };
        const response = await request(app).post('/api/user/login').send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBe(true);
        token = response.body.token;
    });

    // Test fetching all users
    it('GET /api/user/getAll | Response should be json', async () => {
        const response = await request(app).get('/api/user/getAll').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    // Test fetching all hotels
    it('GET /api/hotel/get_hotels | Response should be json', async () => {
        const response = await request(app).get('/api/hotel/get_hotels');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    // Test creating a hotel
    it('POST /api/hotel/create_hotel | Response should be json', async () => {
        const hotelData = {
            hotelName: 'Test Hotel',
            hotelPrice: '200',
            hotelDescription: 'Test description',
            hotelCategory: 'Test category',
        };
        const response = await request(app).post('/api/hotel/create_hotel').send(hotelData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    // Test updating a hotel
    it('PUT /api/hotel//update_hotel/:id | Response should be json', async () => {
        const hotelId = '65d9e90ac2ca3147029dd419';
        const updatedHotelData = {
            hotelName: 'Updated Hotel Name',
        };
        const response = await request(app).put(`/api/hotel//update_hotel/:id`).send(updatedHotelData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    // Test deleting a hotel
    it('DELETE /api/hotel/delete_hotel/:id | Response should be json', async () => {
        const hotelId = 'validHotelId'; // Replace with a valid hotel ID
        const response = await request(app).delete(`/api/hotel//delete_hotel/:id`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });
});
