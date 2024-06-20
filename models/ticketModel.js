const mongoose = require("mongoose");


const ticketSchema = mongoose.Schema(
   {
      passengerId:{
         type:String,
         required:true
      },

   },{
      timestamps:true
   }
) 