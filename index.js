const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL; 

// console.log(PORT,MONGODB_URL);

app.listen(PORT,()=>console.log(`Server running at port: ${PORT}`));