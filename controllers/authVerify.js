const jwt = require('jsonwebtoken')

function verifyToken(token){
   let reqUser = null;
   
   if(!token){
      return null;
   }
   const accessToken = token.split('Bearer')[1].trim();

   jwt.verify(accessToken,process.env.JSON_WEBTOKEN_KEY, (err,user) => {
      if(err){
         return null;
      }
      reqUser = user;
   })
   return reqUser;

}
function verifyAdmin(req,res,next){
   
   const token = req.headers.authorization
   const user = verifyToken(token);
   console.log(user)
   if(!user || user.role !== "admin"){
      return res.status(401).json({
         message:"You are not authorized.",
         success:true,
      })
   }
   next();
}

function verifyUser(req,res,next){

}

module.exports = {verifyToken,verifyAdmin,verifyUser}