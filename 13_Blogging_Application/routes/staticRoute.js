const express=require('express');
const Blog = require('../models/blog');
const router=express.Router();

router.get("/",async (req,res)=>{
    // console.log('User in route:', req.user); // Debug log?
    const allBlogs=await Blog.find({});
    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})

router.get("/signin",(req,res)=>{
    return res.render('login')
})

router.get("/signup",(req,res)=>{
    return res.render('signup')
})



module.exports=router;