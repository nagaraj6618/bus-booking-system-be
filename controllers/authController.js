const userModel = require('../models/userModel');
const bcryptjs = require("bcryptjs");
const jsonWebToken = require('jsonwebtoken');
async function register(req,res){
   // console.log(req.body);

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
   // console.log(req.body);
   // const data = [];
   const {userNameOrEmail,password} = req.body;
   if(!userNameOrEmail || !password){
      return res.status(400).json({
         message: "Username or email or password required",
         status: false
      });
   }
   try{
      const findUser = await userModel.findOne({
         $or:[
            {
               email:userNameOrEmail
            },
            {
               userName:userNameOrEmail
            }
         ]
      });
      if(!findUser){
         return res.status(404).json({
            message:"User not found please register the account.",
            status:false
         })
      }
      // console.log(findUser);
      const isPassordCorrect = await bcryptjs.compareSync(password,findUser.password); 
      if(!isPassordCorrect){
         return res.status(400).json({
            message:"Invalid Passowrd",
            success:false,
         })
      }
      //Generate TOken for the user
      const token = jsonWebToken.sign(
         {
            id:findUser._id,
            role:findUser.role
         },
         process.env.JSON_WEBTOKEN_KEY,
         {
            expiresIn:"1h"
         }
      );
      
      res.cookie("accessToken",token,{
         expires:new Date(Date.now() + 3600000),//One hour
         httpOnly:true,
         secure:true,
      }).status(200).json({
         message:"User login successfull",
         status:true,
         data:findUser,
         token:token,
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
module.exports = {register,login};