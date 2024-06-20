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
      type:Array,
      enum:["ac","nonac","sleeper","normal"],
      default:["ac","sleeper"]
   },
   image:{
      type:[String]
   },
   busRoute:{
      type:[Array],
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