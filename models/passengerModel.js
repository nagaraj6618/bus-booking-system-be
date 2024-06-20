const mongoose = require("mongoose");

const passengerSchema = mongoose.Schema({
   passengerName:{
      type:String,
      required:true,
      trim: true,
   },
   passengerAge:{
      type:Number,
      required:true,
      min:0,
      max:90
   },
   passengerGender:{
      type:String,
      enum:["male","female"],
      required:true
   },
   busId:{
      type:String,
      required:true,
   },
   userId:{
      type:String,
      required:true
   }
},{
   timestamps :true
}
);

module.exports = mongoose.model('passenger',passengerSchema);