const mongoose = require("mongoose");


const ticketSchema = mongoose.Schema(
   {
      userId:{
         type:String,
         required:true,
      },
      busId:{
         type:String,
         required:true,
      },
      passengerId:{
         type:String,
         required:true
      },
      from:{
         type:String,
         required:true,
      },
      to:{
         type:String,
         required:true,
      },
      travelDate:{
         type:String,
         require:true
      },
      travelTime:{
         type:String,
         require:true
      },
      bookedAt:{
         type:String,
         required:true,
      },
      numberOfSeat:{
         type:Number,
         required:true,
      },
      price:{
         type:Number,
         required:true
      },
      seatNumber:{
         type:[String],
         required:true
      }

   },{
      timestamps:true
   }
) 
module.exports = mongoose.model('ticket',ticketSchema);