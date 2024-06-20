const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
   busName:{
      type:String,
      required:true
   },
   busNumberPlate:{
      type:String,
      required:true,
   },
   busType:{
      type:[String],
      default:["ac","sleeper"]
   },
   image:{
      type:[String]
   },
   fare:{
      type:Number,
      required:true,
   },
   decreaseFare:{
      type:Number,
      required:true,
      default:5
   },
   rating:{
      type:Number,
      required:true,
      default:3
   }

})

module.exports = mongoose.model('bus',busSchema );