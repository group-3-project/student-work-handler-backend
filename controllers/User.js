//models
const User = require("../models/Users");
const Verification = require("../models/Verificationtoken");
const ResetToken = require("../models/resetToken");

//special function
const {
  mailTaransport,
  genrating_JWT_Token
} = require("../utils/mail");
const {
  genrateOTP,
  createRandomBytes
} = require("../utils/mail");

//jwt
const jwt = require("jsonwebtoken");

//pasword hasing
const bcrypt = require("bcrypt");

//validing object
const {
  isValidObjectId
} = require("mongoose");

//Sign up
exports.signup = async (req, res) => {
  //checking user already exits or not
  const user_e = await User.findOne({
    email: req.body.email
  });

  if (user_e) {
    return res.status(400).json({
      success: false,
      message: "User alrfeady registered",
    });
  }


  let {
    name,
    email,
    password
  } = req.body;
  //hashing password
  const hash = await bcrypt.hash(password, 8);
  console.log(hash);
  const _user = new User({
    name,
    email,
    password: hash,
  });
  //opt
  var OTP = genrateOTP();
  //hashing otp
  const hasht = await bcrypt.hash(OTP, 8);

  const _verf = new Verification({
    owner: _user._id,
    token: hasht,
  });

  //saving in databse
  await _verf.save();
  await _user.save();

  //mail
  mailTaransport().sendMail({
    from: "TEAM@gmail.com",
    to: _user.email,
    subject: "Verify your email account",
    html: `<h1>${OTP}</h1>`,
  });

  res.json({
    success: true,
    user: {
      userid: _user._id,
      verified: _user.verified
    }

  });
};

//Sign in
exports.signin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  //checking User
  const user = await User.findOne({
    email
  });
  if (!user)
    return res.status(400).json({
      success: false,
      message: "user not found",
    });

  //checking password
  const isMatched = await user.authenticate(password);
  if (user.verified === false) {
    return res.status(400).json({
      success: false,
      message: "verify your  account",
    });

  }
  if (!isMatched)
    return res.status(400).json({
      success: false,
      message: "password is wrong",
    });

console.log("signin");
  res.json({
    success: true,
    message: {
      name: user.name,
      email: user.email,
      id: user._id,
      tokenjwt: genrating_JWT_Token(user._id)
    },
  });
};

// verifyuser
exports.verifyuser = async (req, res) => {
  const {
    Id,
    otp
  } = req.body;

  //checking detils
  if (!Id || !otp.trim()) {
    return res.status(400).json({
      success: false,
      message: "something is wrong",
    });
  }
  if (!isValidObjectId(Id)) {
    return res.status(400).json({
      success: false,
      message: "User id is not valid",
    });
  }
  const user = await User.findById(Id);
  if (!user)
    return res.status(400).json({
      success: false,
      message: "something is wrong",
    });
  if (user.verified)
    return res.status(400).json({
      success: false,
      message: "this account already verified!",
    });

  const token = await Verification.findOne({
    owner: user._id
  });

  if (!token)
    return res.status(400).json({
      success: false,
      message: " user not found",
    });

  const isMachced = await token.authenticate(otp);

  if (!isMachced)
    return res.status(400).json({
      success: false,
      message: "token is incorrect",
    });

  user.verified = true;
  await Verification.findByIdAndDelete(token._id);
  await user.save();
  mailTaransport().sendMail({
    from: "minor-project-J-TEAM@gmail.com",
    to: user.email,
    subject: "t",
    html: `<h1>wellcome </h1>`,
  });
  res.send("verified");
};

//=======================================================================================
//{forgot pssword}
exports.forgotPassword = async (req, res) => {
  const {
    email
  } = req.body;

  //checking emial id presenter:
  if (!email)
    return rs.status(400).json({
      success: false,
      message: "required email id",
    });

  const user = await User.findOne({
    email
  });

  //checking user
  if (!user)
    return res.status(400).json({
      success: false,
      message: "user not found invalid request",
    });

  //check reset token already
  const token = await ResetToken.findOne({
    owner: user._id
  });
  if (token)
    return res.status(400).json({
      success: false,
      message: "only after 1 hour you can reset",
    });

  //genrate random token
  const tokens = 'cdsdrt43w5e54y';
  console.log(tokens)
  const resetToken = new ResetToken({
    owner: user._id,
    token: tokens
  });
  await resetToken.save();
  console.log(resetToken)

  //sending mail form reset request
  mailTaransport().sendMail({
    from: "minor-project-J-TEAM@gmail.com",
    to: user.email,
    subject: "Password reset",
    html: `http://localhost:3002/reset-password?token=${tokens}
            &id=${user._id}`,
  });
  return res.json({
    success: true,
    message: "password reset line is send to your email",
  });
};

//resset password
exports.resetPassword = async (req, res) => {
  const {
    password
  } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.json({
      success: false,
      message: "user not found",
    });
  }
  const isSamepassword = await user.authenticate(password);
  if (isSamepassword) {
    return res.json({
      success: false,
      message: "password must be different",
    });
  }
  if (password.trim().length < 6) {
    return res.json({
      success: false,
      message: " password must be more that 8 characters",
    });
  }
  user.password = password.trim();
  await user.save();

  await ResetToken.findOneAndDelete({
    owner: user._id
  })
  mailTaransport().sendMail({
    from: "minor-project-J-TEAM@gmail.com",
    to: user.email,
    subject: "Password reset done thanks",
    html: `<h1>LOGIN WITH NEW PASSWORD</h1>`,
  });
  res.json({
    success: true,
    message: " password must be more that 8 characters",
  });

};