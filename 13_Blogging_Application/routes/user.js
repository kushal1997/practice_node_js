const {Router} = require("express");
const {handleSignUp,handleSignIn, handleLogout}=require("../controllers/user");

const router=Router();

router.post('/signup',handleSignUp)
router.post('/signin',handleSignIn);

router.get('/logout',handleLogout)

module.exports=router;