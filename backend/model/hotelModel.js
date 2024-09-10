const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName :{
        type : String,
        required : true,
        trim : true,
    },
    hotelPrice :{
        type : Number,
        required : true,
        trim : true,
    },
    hotelDescription :{
        type : String,
        required : true,
        trim : true,
    },
    hotelCategory :{
        type : String,
        required : true,
        trim : true,
    },
    hotelImageUrl : {
        type : String,
        required : false,
    },
    createdAt :{
        type : Date,
        default : Date.now(),
    }

})

const Hotels = mongoose.model('hotels', hotelSchema);
module.exports = Hotels;