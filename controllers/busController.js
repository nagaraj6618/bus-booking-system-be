
const busModel = require('../models/BusModel');
const busRouteModel = require('../models/routeModel')

async function getAllBus(req,res){
   try{
      
      const busData = await busModel.find();
      res.status(200).json({
         message:"Retrived All Bus details",
         success:true,
         data:busData,
      });
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         status:false,
         error:error
      });
   }
}
async function getBusById(req,res){
   try{
      const id = req.params.id;
      var busData = await busModel.findById(id);
      const busRouteDetails = await busRouteModel.findOne({
         busId:busData._id
      });
      const {busRoute,minutesBetweenEachRoute} = busRouteDetails;
      
      busData = {...busData,busRoute,minutesBetweenEachRoute}; 
      console.log(busData)
      res.status(200).json({
         success:true,
         message:"Retrived Bus details by id.",
         data:busData._doc
      });
   }
   catch(error){
      res.status(500).json({
         message:"Bus details not found",
         status:false,
         error:error
      });
   }
}

async function addNewBus(req,res){
   console.log(req.body);
   const {
         busName,busNumberPlate,
         busType,image,
         fare,decreaseFare,
         busRoute,minutesBetweenEachRoute
      } = req.body;
   try{
      const isAlreadyBusRegistered = await busModel.findOne({
         busNumberPlate:busNumberPlate
      })
      console.log(isAlreadyBusRegistered)
      if(isAlreadyBusRegistered){
         return res.status(400).json({
            message:"Bus Already Registered.",
            success:false,
         })
      }
      const addBusData = await busModel(
         {
            busName,busNumberPlate,busType,image,fare,decreaseFare
         }
      );
      await addBusData.save();
      const addBusRoute = await busRouteModel({
         busId:addBusData._id,
         busRoute:busRoute,
         minutesBetweenEachRoute:minutesBetweenEachRoute
      });
      await addBusRoute.save()
      
      res.status(200).json(
         {
            message:"Bus added successfully",
            success:true,
            data:addBusData,
         }
      )
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         status:false,
         error:error
      });
   }
}
async function updateBusDetails(req,res){

}
async function deleteBusById(req,res){

}
module.exports = {getAllBus,getBusById,addNewBus,updateBusDetails,deleteBusById}