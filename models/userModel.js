const mongoose = require('mongoose');

const userModel = mongoose.Schema({
   name:{
      type:String,
      required:true,
   },
   userName:{
      type:String,
      required:true,
      unique:true
   },
   email:{
      type:String,
      required:true,
      unique:true,
   },
   password:{
      type:String,
      required:true,
   },
   role:{
      type:String,
      required:true,
      default:'user',
   },
   verified:{
      type:Boolean,
      required:true,
      default:false,
   },
   createdAt:{
      type:String,
      required:true,
   }
},{
   timestamps:true
})

module.exports = mongoose.model('user',userModel);