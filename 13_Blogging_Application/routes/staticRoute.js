const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    console.log('User in route:', req.user); // Debug log
    return res.render('home',{
        user:req.user,
    })
})

router.get("/signin",(req,res)=>{
    return res.render('login')
})

router.get("/signup",(req,res)=>{
    return res.render('signup')
})

module.exports=router;