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
         message:"Admin only authorized.",
         success:false,
      });
   }
   next();
}

function verifyUser(req,res,next){
   const token = req.headers.authorization;
   const user = verifyToken(token);
   console.log(user);
   if(!user || user.role !== "user" ){
      return res.status(401).json({
         message:"You are not authorized.Because you are not valid user.",
         success:false
      });
   }
   next()
}
//either Admin or Normal User
function verifyValidUser(req,res,next){
   const token = req.headers.authorization;
   const user = verifyToken(token);
   console.log(user);
   if(!user){
      return res.status(401).json({
         message:"You are not authorized.Because you are not valid user.",
         success:false
      });
   }
   next();
}

module.exports = {verifyToken,verifyAdmin,verifyUser,verifyValidUser}