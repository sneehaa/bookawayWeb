import axios from "axios";
import login_mock from "../mock/login_mock";
const backendURL = "http://localhost:5500";

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTE4YjBkM2FiYjQwZDQ0OWM5MTlmOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTM1NTM2OX0.-VWV6BHj4-dUA3zA4xMEdxL_Y7kTrRptYTOkypcmkhs";

describe("App Testing", () => {
  //Login
   it("POST /login | Login Successful", async () => {
    const response = await axios.post(
      `${backendURL}/api/user/login`,
      login_mock
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });

  //Get All Users
  it("GET /api/user/getAll| Should work", async () => {
    try {
      const response = await axios.get(`${backendURL} /api/user/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.message).toBe("All Users fetched successfully!");
      expect(response.data.users).toBeDefined();
    } catch (error) {
      console.error("Error:", error);
    }
  });


//   //Get User Profile by ID
  it("GET /api/user/profile/:userId | User Profile", async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/user/profile/65d972a8f8b4584e1e6e95ee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.message).toBe("User profile fetched successfully.");
      expect(response.data.userProfile).toBeDefined();
    } catch (error) {
      console.error("Error:", error);
    }
  });
  it("GET /api/hotel | All Hotel", async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/hotel/get_hotels`, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming authentication is required
          },
        }
      );

      // Assert that the response status code is 200 OK
      expect(response.status).toBe(200);

      // Assert that the response message is as expected
      expect(response.data.message).toBe("All Hotels fetched successfully!")


      // Assert that the hotels data is defined and not empty
      expect(response.data.hotels).toBeDefined();

    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow to make Jest aware of the failed test in case of error
    }
  });
  describe('Hotel API Tests', () => {
    it("DELETE /api/hotel/delete_hotel/:id | Delete Hotel", async () => {
      const hotelId = '65d9e90ac2ca3147029dd419';
      try {
        const response = await axios.delete(
          `${backendURL}/api/hotel/delete_hotel/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("Hotel deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  describe('User API Tests', () => {
    it("PUT /api/user/edit/:userId | Edit User Profile", async () => {
      const userId = '65d972a8f8b4584e1e6e95ee';
      const updateData = {
        name: "Updated Name",
        email: "updatedemail@example.com",

      };
  
      try {
        const response = await axios.put(
          `${backendURL}/api/users/edit/${userId}`,
          updateData, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
  
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("User profile updated successfully.");
        expect(response.data.updatedUserProfile).toBeDefined();
        expect(response.data.updatedUserProfile.name).toBe(updateData.name);
        expect(response.data.updatedUserProfile.email).toBe(updateData.email);
        // Additional assertions can be added here as needed
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  describe('OTP API Tests', () => {
    it("POST /api/send-otp | Send OTP to User", async () => {
      const requestData = {
        email: "sneha@gmail.com", // Use a valid email of a test user in your system
      };
  
      try {
        const response = await axios.post(
          `${backendURL}/api/send-otp`,
          requestData,
          {
            // Add headers if needed, for example, a Content-Type header
            headers: {
              'Content-Type': 'application/json',
              // If your endpoint requires authentication, add Authorization header
              // Authorization: `Bearer ${token}`,
            },
          }
        );
  
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("OTP sent to your email.");
        // Additional assertions can be added here as needed
      } catch (error) {
        console.error("Error:", error);
      }
    });

    describe('OTP Verification and Password Update API Tests', () => {
      it("POST /api/verify-otp-and-update-password | Verify OTP and Update Password", async () => {
        const updateData = {
          email: 'sneha@gmail.com',
          otp: '490737', 
          newPassword: 'newSecurePassword123!',
        };
    
        try {
          const response = await axios.post(
            `${backendURL}/api/verify-otp-and-update-password`,
            updateData,
            {
              headers: {
              },
            }
          );
    
          expect(response.status).toBe(200);
          expect(response.data.message).toBe("Password updated successfully.");
        } catch (error) {
          // Ensure that Jest handles the error properly
          console.error("Error:", error);
          throw error; 
        }
      });

  
});
});
});