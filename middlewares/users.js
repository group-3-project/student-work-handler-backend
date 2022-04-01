const {isValidObjectId} =require('mongoose')
const User = require('../models/Users')
const ResetTokem=require('../models/resetToken')

//restet token 
exports.isResetTokenValid=async (req, res,next)=>{
    const {token,id }=req.query;
    if(!token  || !id) return res.status(404).json({
        success:false,
        message:"Invaid request"
    })
    if(!isValidObjectId(id))
    {
        return res.status(404).json({
            success:false,
            message:"Invaid user"
        })
    }
   const user= await  User.findOne(id)
   if(!user)
   {
       return res.status(404).json({
           success:false,
           message:" user not found !"
       });
   }
   const ressettoken=await ResetTokem.findOne({owner:user._id})
   if(!ressettoken)
   {
       return res.status(404).json({
           success:false,
           message:" Reset token not found !"
       });
   }
   const IsValid =await ressettoken.compare(token)

   if(!IsValid)
   {
    return res.status(404).json({
        success:false,
        message:"Reset token is invalid!"
    });
   }
   req.user=user;
   next();


}  