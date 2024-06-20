const userModel = require('../models/userModel');
const bcryptjs = require("bcryptjs");
async function register(req,res){
   console.log(req.body);
   // const data =[];
   const {name,userName,email,password,} = req.body;
   if (!name || !userName || !email || !password) {
      return res.status(400).json({
         message: 'All fields are required',
         status: false
      });
   }   

   try{
      const isExsistingUser = await userModel.find({
         $or:[
            {email:email},
            {userName:userName}
         ]
      });
      if(isExsistingUser.length>0){
         return res.status(400).json({
            message:"Already user registered",
            success:false,
         })
      }
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(password,salt);
      
      const userData = new userModel(
         {
            name:name,
            userName:userName,
            email:email,
            password:hashPassword,
            createdAt:Date.now()
         }
      )
      await userData.save();
      
      res.status(200).json({
         message:'User Signup Successfully',
         status:true,
         data:userData
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         status:false,
         error:error
      })
   }

   
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