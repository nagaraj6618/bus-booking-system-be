const mongoose = require('mongoose');

const busRouteModel = mongoose.Schema({
   busId:{
      type:String,
      unique:true,
      required:true,
   },
   busRoute:{
      type:[String],
      required:true
   },
   
   minutesBetweenEachRoute:{
      type:[Number]
   }
},{
   timestamps:true
})

module.exports = mongoose.model('busRouteModel',busRouteModel);