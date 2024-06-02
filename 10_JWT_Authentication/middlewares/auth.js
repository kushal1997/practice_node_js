const { getUser } = require("../services/auth");

async function restrictToLoggedUserOnly(req,res,next){
    // console.log(req)
    const userId=req.headers.authorization;
    if(!userId) return res.redirect('/login');
console.log("userId",userId) 
    const token=userId.split('Bearer ')[1];
    
    const user=getUser(token);
    if(!user) return res.redirect('/login');

    req.user=user;
    next();
}
async function checkAuth(req,res,next){
    const userUid=req.headers.authorization;
    console.log("userId",userUid,"headers",req.headers) 
    const token=userUid.split('Bearer ')[1];
    const user=getUser(token);
    console.log(user)
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedUserOnly,
    checkAuth,
}