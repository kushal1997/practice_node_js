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





module.exports=router;