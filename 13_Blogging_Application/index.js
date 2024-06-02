const express=require("express");
const path=require('path');

const staticRouter=require('./routes/staticRoute');

const app=express();
const PORT=8000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/',staticRouter)

app.listen(PORT,()=>console.log("Server is running at PORT :",PORT))