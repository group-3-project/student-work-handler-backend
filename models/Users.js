const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
      required: true,
      trim: true,
      lowercase: true,
  },
  password:{
      type:String,
      required: true,
      trim: true,
      length:10
  },
  avatar: {
       type: String,
       default:''
      },

  verified:{
    type:Boolean,
    default:false,
    required: true,

  }


});

UserSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.password );
  },
};


const User = mongoose.model('Users',UserSchema);
 module.exports =User;