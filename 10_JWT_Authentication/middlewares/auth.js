const { getUser } = require("../services/auth");

async function restrictToLoggedUserOnly(req,res,next){
    // console.log(req)
    const userUid=req.cookies?.uid;
    if(!userUid) return res.redirect('/login');
    const user=getUser(userUid);
    if(!user) return res.redirect('/login');

    req.user=user;
    next();
}
async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;
    const user=getUser(userUid);
    console.log(user)
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedUserOnly,
    checkAuth,
}