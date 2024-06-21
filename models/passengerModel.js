const mongoose = require("mongoose");

const passengerSchema = mongoose.Schema({
   passengerDetails:[
      {
         name:{
            type:String,
            required:true,
         },
         age:{
            type:Number,
            min:0,
            max:90
         },
         gender:{
            type:String,
            enum:["male","female","Male","Female"],
            required:true
         },
      }
   ]  
   ,
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