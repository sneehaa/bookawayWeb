const mongoose = require ('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to Database")
    })
}

module.exports = connectDB;