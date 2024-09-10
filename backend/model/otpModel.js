const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  otp: {
    type: String,
    required: true,
  },
  isUsed: { 
    type: Boolean, 
    default: Date.now
 },
});

const OTP = mongoose.model("OTP", optSchema);
module.exports = OTP;
