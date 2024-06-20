const busModel = require('../models/BusModel');


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
      const userData = await busModel.find({
         _id:id
      });
      res.status(200).json({
         success:true,
         message:"Retrived Bus details by id.",
         data:userData
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

}
async function updateBusDetails(req,res){

}
async function deleteBusById(req,res){

}
module.exports = {getAllBus,getBusById,addNewBus,updateBusDetails,deleteBusById}