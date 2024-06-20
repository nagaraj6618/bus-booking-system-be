const userModel = require('../models/userModel');

async function register(req,res){
   console.log(req.body);
   const data =[];
   res.status(200).json({
      message:'User Signup Successfully',
      status:true,
      data:data
   })
}
async function login(req,res){
   console.log(req.body);
   const data = [];
   res.status(200).json({
      message:"User login successfull",
      status:true,
      data:data,
   })
}
module.exports = {register,login};