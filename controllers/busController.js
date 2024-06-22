
const busModel = require('../models/BusModel');
const ticketModel = require('../models/ticketModel');
// const routeModel = require('../models/routeModel');
// const busRouteModel = require('../models/routeModel')

async function getAllBus(req, res) {
   try {
      const fromLocation = req.query.fromLocation;
      const toLocation = req.query.toLocation;
      console.log(fromLocation,toLocation)
      const busData = await busModel.find();
      if(busData.length<1){
         return res.status(404).json({
            message: "Bus route not found..",
            success:false,
         })
      }
      if(!fromLocation || !toLocation){
         let totalBusRoute=[];
         busData.map((data) => {
            data.busRoute.map((routeData) => {
               if(!totalBusRoute.includes(routeData)){
                  totalBusRoute.push(routeData)
               }
               
            })
         })
         totalBusRoute.sort();
         return res.status(200).json({
            message: "Retrived All Bus details",
            success: true,
            data: busData,
            totalRoute:totalBusRoute,
         });
      };
      
      const filteredData = busData.filter((data,index) => {
         const busRoute = data.busRoute;
         if(
            busRoute.includes(fromLocation.toLowerCase()) &&
            busRoute.includes(toLocation.toLowerCase()) &&
            busRoute.indexOf(fromLocation.toLowerCase()) <
            busRoute.indexOf(toLocation.toLowerCase())
         ){
            return data;
         }
      });
      if(!filteredData.length>0){
         return res.status(404).json({
            message: "Bus route not found..",
            success:false,
         });
      };

      res.status(200).json({
         message:"Retrived all the bus based on from and to location..",
         data:filteredData
      })

      
   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         status: false,
         error: error
      });
   }
}
async function getBusById(req, res) {
   try {
      const id = req.params.id;
      const busData = await busModel.findById(id);

      if (!busData) {
         return res.status(404).json({
            success: false,
            message: "Bus not found",
         });
      }
      const travelDate = req.query.date
      if(!travelDate){
         return res.status(200).json({
            success: true,
            message: "Retrieved bus details by ID.",
            data: {busData}
         });
      }
      console.log(travelDate)
      const bookedTicket = await ticketModel.find({
         busId:id,
         travelDate:travelDate
      })
      console.log(bookedTicket);
      let bookedSeat = [];
      for(let i=0;i<bookedTicket.length;i++){
         bookedTicket[i].seatNumber.map((data)=> {
            bookedSeat.push(data);
         })
      }

      bookedSeat.sort();

      res.status(200).json({
         success: true,
         message: "Retrieved bus details by ID.",
         data: {busData,bookedSeat}
      });
   } catch (error) {
      res.status(500).json({
         message: "Bus details not found",
         status: false,
         error: error.message,
      });
   }
}


async function addNewBus(req, res) {
   // console.log(req.body);
   const {
      busName, busNumberPlate,
      busType, image,
      fare, decreaseFare,
      busRoute, minutesBetweenEachRoute,startTime,totalTime
   } = req.body;
   if (!busName || !busNumberPlate
      || !busType || !image
      || !fare || !decreaseFare
      || !busRoute || !minutesBetweenEachRoute
      || !startTime || !totalTime
      ) {
         return res.status(400).json({
            message:"Provide All the details.",
            success:false
         });
   }

   try {
      
      const isAlreadyBusRegistered = await busModel.find({
         busNumberPlate: busNumberPlate,
         endTime: { $gt: (startTime+2)%24 }
      
         
      });
      // console.log(isAlreadyBusRegistered)
      let endTimeOfTravel = (totalTime+startTime)%24;
      
      if (isAlreadyBusRegistered.length>0 ) {
         
         return res.status(400).json({
            message: "Bus Already Registered.",
            success: false,
         })
      }
      
      
      
      const addBusData = await new busModel(
         {
            busName:busName,
            busNumberPlate:busNumberPlate, 
            busType:busType, 
            image:image, 
            fare:fare, 
            decreaseFare:decreaseFare,
            startTime:startTime,
            busRoute:busRoute,
            endTime:endTimeOfTravel,
            totalTime:totalTime,
            minutesBetweenEachRoute:minutesBetweenEachRoute
         }
      );
      await addBusData.save();
      console.log(addBusData)
      // let addBusRoute = [];
     
      // const addBusRouteData = await new routeModel({
      //    busId:addBusData._id,
      //    startTime:startTime,
      //    busRoute:busRoute,
      //    endTime:endTimeOfTravel,
      //    totalTime:totalTime,
      //    minutesBetweenEachRoute:minutesBetweenEachRoute
      // })

      res.status(200).json(
         {
            message: "Bus added successfully",
            success: true,
            data: addBusData,
         }
      )
   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         status: false,
         error: error
      });
   }
}


async function updateBusDetails(req, res) {
   const {busDetails} = req.body;
   const id = req.params.id;
   console.log(busDetails);
   try{
      const updatedData = await busModel.findByIdAndUpdate({_id:id},busDetails);
      res.status(200).json({
         message:"Updated bus details successfully.",
         success:true,
         data:updatedData
      })
   }
   catch(error){
      res.status(500).json({
         message: error.message,
         status: false,
         error: error
      });
   }
}
async function deleteBusById(req, res) {
   const id = req.params.id;
   try{
      const deletedData = await busModel.findByIdAndDelete(id);
      // if(!deletedData){

      // }
      console.log(deletedData);
      res.status(200).json({
         message:"Deleted bus details successfully.",
         success:true,
         data:deletedData
      });
   }
   catch(error){
      res.status(500).json({
         message: "An error occured while deleting data.",
         status: false,
         error: error
      });
   }
}
module.exports = { getAllBus, getBusById, addNewBus, updateBusDetails, deleteBusById }