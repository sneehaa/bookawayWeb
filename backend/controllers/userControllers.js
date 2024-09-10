const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../model/otpModel");
const nodemailer = require("nodemailer");

//function for generating the otp
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

//configuring nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adhikarisneha0001@gmail.com",
    pass: "koqycslmnunmthqn",
    // user: process.env.EMAIL_USERNAME,
    // pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database
    try {
      await OTP.create({ userId: user.id, otp, isUsed: false });
    } catch (error) {
      console.error("Error saving OTP to database:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to save OTP." });
    }

    // Send OTP to user's email
    await transporter.sendMail({
      from: '"BookAway" <adhikarisneha0001@gmail.com>',
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for password reset is: ${otp}`,
    });

    // Update user's OTP in the database
    user.otp = otp;
    await user.save();

    console.log("OTP sent to user:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

// Controller function to verify OTP and update password
const verifyOTPAndUpdatePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Finding the user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Checking if the user's password has already been updated with the OTP
    if (user.passwordUpdatedWithOTP) {
      return res
        .status(400)
        .json({ success: false, message: "OTP already used." });
    }

    // Finding the OTP record for the user
    const otpRecord = await OTP.findOne({
      userId: user.id,
      otp,
      isUsed: false,
    });

    if (!otpRecord || otpRecord.isUsed) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Encrypt the new password
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, randomSalt);

    // Updating the user's password with the encrypted password
    user.password = encryptedPassword;

    // Mark the OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Setting the flag to indicate that the OTP has been used to update the password
    user.passwordUpdatedWithOTP = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Error verifying OTP and updating password:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update password." });
  }
};

const register = async (req, res) => {
  // step 1 : Check if data is coming or not
  console.log(req.body);

  // step 2 : Destructure the data
  const { firstName, lastName, email, password } = req.body;

  // step 3 : validate the incomming data
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all the fields.",
    });
  }

  // step 4 : try catch block
  try {
    // step 5 : Check existing user
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    // password encryption
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    // step 6 : create new user
    const newUser = new Users({
      // fieldname : incomming data name
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    });

    // step 7 : save user and response
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const loginUser = async (req, res) => {
  // step 1: Check incomming data
  console.log(req.body);

  // destructuring
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  // try catch block
  try {
    // finding user
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists.",
      });
    }

    // user exists:  {FirstName, LastName, Email, Password} user.password
    // Comparing password
    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // response
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    //limiting query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query._limit) || 10;

    const skip = (page - 1) * limit;

    const users = await Users.find({}).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "All users fetched successfully.",
      count: users.length,
      page: page,
      limit: limit,
      users: users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Extract user ID from the request
    const userId = req.params.userId;

    // Fetch the user's profile data based on the user ID
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Exclude the password field from the user object
    const userProfile = { ...user.toObject() };
    delete userProfile.password;

    // Return user profile data without the password
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//edit user profile
const editUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUserProfile = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      updatedUserProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//User Profile Function
const userProfile = async (req, res, next) => {
  const user = await Users.findOne(req.user.id).select("-password");
  console.log(user, "User");
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = {
  register,
  loginUser,
  getAllUsers,
  getUserProfile,
  userProfile,
  editUserProfile,
  sendOTP,
  verifyOTPAndUpdatePassword,
};
