const mongoose = require("mongoose");


const ticketSchema = mongoose.Schema(
   {
      userId:{
         type:String,
         required:true,
      },
      passengerIds:{
         type:[String],
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
      bookedAt:{
         type:String,
         required:true,
      },
      numberOfSeat:{
         type:Number,
         required:true,
      },
      Price:{
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