// import
const router = require('express').Router();
const userController = require("../controllers/userControllers");
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

// create user api
router.post('/register', userController.register)

//  task 1: create login api
router.post('/login', userController.loginUser)

router.get("/profile/:userId",authGuard,authGuardAdmin,userController.getUserProfile,);

router.get("/getAll", authGuard, authGuardAdmin, userController.getAllUsers)
  
  
  //edit user profile
  router.put("/edit/:userId",authGuard,authGuardAdmin, userController.editUserProfile);

// exporting
module.exports = router;