const express = require("express");
const { connectMongodb } = require("./config/mongoose");

const urlRouter=require('./routes/url')
const app =express();
const PORT =8000;

connectMongodb("mongodb://127.0.0.1:27017/url_shortener")
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json())
  app.use('/url',urlRouter);

app.listen(PORT,()=>console.log("Server is running at ",PORT))