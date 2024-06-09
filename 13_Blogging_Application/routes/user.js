const {Router} = require("express");
const {handleSignUp,handleSignIn, handleLogout}=require("../controllers/user");

const router=Router();
router.get("/signin",(req,res)=>{
    return res.render('login')
})

router.get("/signup",(req,res)=>{
    return res.render('signup')
})
router.post('/signup',handleSignUp)
router.post('/signin',handleSignIn);

router.get('/logout',handleLogout)

module.exports=router;