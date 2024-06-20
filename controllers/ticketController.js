const ticketModel = require("../models/ticketModel");
const passengerModel = require("../models/passengerModel");
const { verifyToken } = require("./authVerify");


async function getAllBooking(req,res){
   const token = req.headers.authorization;
   const isUser = verifyToken(token);
   try{
      if(isUser.role === "user"){
         const userBookedTicket = await ticketModel.find({
            userId:isUser.id,
         });
         return res.status(200).json({
            message:"Retrived all booked tickets.",
            success:true,
            data:userBookedTicket,
         });
      }

      const AllBookedTicket = await ticketModel.find();
      res.status(200).json({
         message:"Retrived all booked tickets.",
         success:true,
         data:AllBookedTicket,
      });
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         error:error,
         success:false,
      });
   }
   
}
async function getBookingById(res,res){
   const id = req.params.id;
   try{
      const bookedTicket = await ticketModel.findById(id);
      res.status(200).json({
         message:"Retrived Booked Ticket details.",
         success:true,
         data:bookedTicket
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         error:error,
         success:false,
      });
   }
}

async function addNewBooking(req,res){

}

async function updateBookingById(req,res){

}

async function deleteBookingById(req,res){
   const id = req.params.id;
   try{
      const deleteBooking = await ticketModel.findByIdAndDelete(id);
      console.log(deleteBooking);
      res.status(200).json({
         message:"Deleted the ticket successfully.",
         status:true
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         error:error,
         success:false,
      });
   }
}

module.exports = {getAllBooking,getBookingById,addNewBooking,updateBookingById,deleteBookingById};