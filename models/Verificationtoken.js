const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const verficationTokenUserSchema = new Schema({
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

verficationTokenUserSchema.methods = {
  authenticate: async function (tokens) {
    console.log("database:"+this.token);
console.log("userenter"+tokens); 
    return await bcrypt.compareSync(tokens, this.token );
  },
};


const  verficationToken = mongoose.model('verficationToken',verficationTokenUserSchema);
 module.exports =verficationToken;