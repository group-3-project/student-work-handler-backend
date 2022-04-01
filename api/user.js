const express = require("express");
const router = express.Router();
const {isResetTokenValid}=require('../middlewares/users')

//validating
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");

//models import
const User = require("../models/Users");


//controlles
const  {signup,signin,verifyuser, forgotPassword} =require("../controllers/User");
const  {resetPassword} =require("../controllers/User");

//Signup
router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,signup);

//SignIN
router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,signin);

//Verify email
router.post(
  "/verify-email",
 verifyuser);

//sending forgot password

router.post('/forgot-password',forgotPassword);
router.post("/reset-password",isResetTokenValid,resetPassword);


//verify token 
router.get("/verify-token",isResetTokenValid,(req,res)=>{
  res.json({success:true})
});

module.exports = router;

