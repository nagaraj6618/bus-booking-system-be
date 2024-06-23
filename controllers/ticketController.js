const ticketModel = require("../models/ticketModel");
const passengerModel = require("../models/passengerModel");
const { verifyToken } = require("./authVerify");
const BusModel = require("../models/BusModel");


async function getAllBookedTicket(req,res){
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
async function getBookedTicketById(res,res){
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

function isRouteInBusRoute (arr,start,end){
   if(arr.includes(start) && arr.includes(end)){
      return true;
   }
   return false;
}
function checkDateIsValid(date){
   const currentDate = new Date(Date.now());
   const travelDate = new Date(date);
   // console.log(currentDate<travelDate)
   return currentDate<travelDate;

}
async function addNewTicketBooking(req,res){
   const {ticketDetails,passengerDetails,busId} = req.body.bookingDetails;
   // console.log({...ticketDetails,passengerDetails});
   if(!ticketDetails || !passengerDetails || !busId){
      return res.status(400).json({
         message:"Provide Valid details..",
         success:false,
      })
   }
   //get User id from token
   const userDetails = verifyToken(req.headers.authorization);
   // console.log(userDetails);
   
   
   try{
      if(!checkDateIsValid(ticketDetails.travelDate)){
         return res.status(400).json({
            message:"Time expired try another dates.",
            success:false,
         })
      }
      const previousBookedDetails = await ticketModel.find({
         busId:busId,
         travelDate:ticketDetails.travelDate,
         travelTime:ticketDetails.travelTime
         
      });

      if(previousBookedDetails.length > 24){
         return res.status(200).json({
            message:"All seats are booked.",
            success:false,
         });
      }
      // console.log(previousBookedDetails.length);
      
      const filteredPreviousBookedDetails = previousBookedDetails.filter((booked) => {
         for (let i=0;i<ticketDetails.seatNumber.length;i++){
   
            if(booked.seatNumber.includes(ticketDetails.seatNumber[i])){
               
               return booked;
            }  
         }
      })
      // console.log("filtered Book ",filteredPreviousBookedDetails);
      if(filteredPreviousBookedDetails.length>0){
         
         return res.status(400).json({
            message:"Selected ticket already booked",
            success:false,
         })
      
      }
      
      const busDetails = await BusModel.findById(busId);
      
      let priceForEachPassenger = busDetails.fare;
      let decreaseFareEachStopping = busDetails.decreaseFare;
      let fromLocation = ticketDetails.from;
      let toLocation = ticketDetails.to;
      // console.log(busDetails)
      
      if(!isRouteInBusRoute(busDetails.busRoute,fromLocation,toLocation)){
         return res.status(404).json({
            message:"Given route is not matching with bus route",
            success:false,
         })
      }


      let decreaseFarePriceCount = busDetails.busRoute.length 
      - Math.abs(busDetails.busRoute.indexOf(toLocation)
      >busDetails.busRoute.indexOf(fromLocation)
      ?busDetails.busRoute.indexOf(toLocation)
      :busDetails.busRoute.indexOf(fromLocation));

      let totalPrice = (priceForEachPassenger*ticketDetails.numberOfSeat) - (decreaseFarePriceCount*decreaseFareEachStopping);

      // console.log(busDetails,priceForEachPassenger,decreaseFareEachStopping,totalPrice);

      // const addPassengerDetails = await passengerModel()
      const passengerData = await new passengerModel({
         passengerDetails:passengerDetails.passengerList,
         busId:busId,
         userId:userDetails.id,
      })
      // console.log(passengerData);

      await passengerData.save();
      
      const ticketBookData =await new ticketModel({
         userId:userDetails.id,
         busId:busId,
         passengerId:passengerData._id,
         from:fromLocation,
         to:toLocation,
         travelDate:ticketDetails.travelDate,
         travelTime:ticketDetails.travelTime,
         bookedAt:new Date(Date.now()),
         numberOfSeat:ticketDetails.numberOfSeat,
         price:totalPrice,
         seatNumber:ticketDetails.seatNumber

      });

      await ticketBookData.save();

      // console.log(ticketBookData)
      
      res.status(200).json({
         message:"Ticket Booked.",
         success:true,
         data:ticketBookData,passengerData,
      })
   }
   catch(error){
      res.status(500).json({
         message:"Ticket Cannot be booked.",
         success:false,
         error:error
      })
   }
}

async function updateBookedTicketById(req,res){

}

async function deleteBookedTicketById(req,res){
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

module.exports = {getAllBookedTicket,getBookedTicketById,addNewTicketBooking,updateBookedTicketById,deleteBookedTicketById};