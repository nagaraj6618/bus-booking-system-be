const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL; 

//importing Routes
const authRoute = require('./routes/authRoute');
const busRoute = require('./routes/busRoute');
const ticketRoute = require('./routes/ticketRoute');
// console.log(PORT,MONGODB_URL);

//middleware 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:true,credentials:true}));





//Db Connection function
(async function (){
   try{
      const connection = await mongoose.connect(MONGODB_URL);
      // console.log(connection);
      if(connection){
         console.log('DB Connected..');
      }
   }
   catch(error){
      console.log('Db Connection Failed:\n',error);
   }
})();

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/bus",busRoute);
app.use("/api/v1/book",ticketRoute);


//Checking ..
app.get('/api/v1',(req,res) => {
   res.status(200).json({
      message:"Server Working",status:true
   })
})


app.listen(PORT,()=>console.log(`Server running at port: ${PORT}`));