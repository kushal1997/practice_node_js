// const http=require("http");
const express = require("express");

const app=express();
const PORT =8000;

app.get('/',(req,res)=>{
    return res.send("Hello from home page")
})

app.get('/about',(req,res)=>{
    return res.send("Hello "+ req.query.name+" you are on ABOUT page")
})

// const myServer=http.createServer(app)

// myServer.listen(PORT,()=>console.log("server Started at",PORT))

app.listen(PORT,()=>console.log("server Started at",PORT));
