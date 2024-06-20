
const busModel = require('../models/BusModel');
// const busRouteModel = require('../models/routeModel')

async function getAllBus(req, res) {
   try {

      const busData = await busModel.find();
      res.status(200).json({
         message: "Retrived All Bus details",
         success: true,
         data: busData,
      });
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
      res.status(200).json({
         success: true,
         message: "Retrieved bus details by ID.",
         data: busData,
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
   console.log(req.body);
   const {
      busName, busNumberPlate,
      busType, image,
      fare, decreaseFare,
      busRoute, minutesBetweenEachRoute
   } = req.body;
   if (!busName || !busNumberPlate
      || !busType || !image
      || !fare || !decreaseFare
      || !busRoute || !minutesBetweenEachRoute) {
         return res.status(400).json({
            message:"Provide All the details.",
            success:false
         });
   }

   try {
      const isAlreadyBusRegistered = await busModel.findOne({
         busNumberPlate: busNumberPlate
      })
      console.log(isAlreadyBusRegistered)
      if (isAlreadyBusRegistered) {
         return res.status(400).json({
            message: "Bus Already Registered.",
            success: false,
         })
      }
      const addBusData = await new busModel(
         {
            busName, busNumberPlate, busType, image, fare, decreaseFare,busRoute,minutesBetweenEachRoute
         }
      );
      await addBusData.save();


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