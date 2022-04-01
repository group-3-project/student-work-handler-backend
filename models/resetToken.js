const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const RessetToken = new Schema({
  owner: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
  },
  token:{
      type:String,
      required: true
  },
  createdAt:{
      type:Date,
      expires:3600,
      default:Date.now()
  }

});

RessetToken.methods = {
  compare : async function (token) {
    return await bcrypt.compareSync(token, this.token );
  },
};


const  Ressettoken = mongoose.model('Ressettoken',RessetToken);
 module.exports =Ressettoken;