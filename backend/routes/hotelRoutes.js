const router = require('express').Router();
const hotelController = require("../controllers/hotelController");
const { authGuard,authGuardAdmin } = require('../middleware/authGuard');

router.post('/create_hotel',authGuardAdmin, hotelController.createHotel)

// get all hotels
router.get("/get_hotels", hotelController.getHotels)

// single hotel
router.get("/get_hotel/:id", hotelController.getSingleHotel)

// update hotel
router.put("/update_hotel/:id",authGuardAdmin, hotelController.updateHotel)

// delete hotel
router.delete("/delete_hotel/:id",authGuardAdmin ,hotelController.deleteHotel)


module.exports = router;