
const busModel = require('../models/BusModel');
const busRouteModel = require('../models/routeModel')

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
      let busData = await busModel.findById(id);

      if (!busData) {
         return res.status(404).json({
            success: false,
            message: "Bus not found",
         });
      }

      const busRouteDetails = await busRouteModel.find({ busId: busData._id });

      if (!busRouteDetails.length) {
         return res.status(404).json({
            success: false,
            message: "Bus route details not found",
         });
      }

      const { busRoute, minutesBetweenEachRoute } = busRouteDetails[0];


      const busResponse = {
         ...busData._doc,
         busRoute,
         minutesBetweenEachRoute,
      };

      console.log(busResponse);
      res.status(200).json({
         success: true,
         message: "Retrieved bus details by ID.",
         data: busResponse,
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
            busName, busNumberPlate, busType, image, fare, decreaseFare
         }
      );
      await addBusData.save();
      const addBusRoute = await new busRouteModel({
         busId: addBusData._id,
         busRoute: busRoute,
         minutesBetweenEachRoute: minutesBetweenEachRoute
      });
      await addBusRoute.save()

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

}
async function deleteBusById(req, res) {

}
module.exports = { getAllBus, getBusById, addNewBus, updateBusDetails, deleteBusById }