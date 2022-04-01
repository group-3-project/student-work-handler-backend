//genrating OTP randoming
exports.genrateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

// Mail
const nodemailer = require("nodemailer");
exports.mailTaransport = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,      
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

//genrating token
const crypto = require("crypto");

exports.createRandomBytes =  () =>
  Promise((resolve, reject) => {
    console.log("dfgsdhyskjht")
    crypto.randomBytes(30, (err, data) => {
      if (err) {
        console.log("ghhhhhhhhhhhhj")
        reject(err);
      }
      const token = data.toString("hex");
      console.log("random",token)
      resolve(token);
     
    });
  });

  //genrating jwtoken 
  const jwt =require("jsonwebtoken") 
  exports.genrating_JWT_Token=(id)=>{
    const jwt_token= jwt.sign({ userId:id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return jwt_token;
  }