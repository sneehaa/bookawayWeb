// importing
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const cloudinary = require('cloudinary');
const acceptMultimedia = require('connect-multiparty');
const { authGuard } = require('./middleware/authGuard');

// Making express app
const app = express();

// dotenv config
dotenv.config();

// cloudinary config

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(acceptMultimedia())

// cors config to accept request from frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions))

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());

// creating test route
app.get("/test", (req,res) => {
    res.status(200).send("Hello");
})

// user routes
app.use('/api/user', require('./routes/userRoutes'))


//hotel routes
app.use("/api/hotel", require("./routes/hotelRoutes"))


//booking Routes
app.use("/api/booking", require("./routes/bookingRoutes"))


//auth routes
app.use("/api", require("./routes/authRoutes"))



// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

// exporting app
module.exports = app;
