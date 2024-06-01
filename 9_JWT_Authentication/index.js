const express = require("express");
const path=require('path');
require('dotenv').config();
const { connectMongodb } = require("./config/mongoose");

const urlRouter=require('./routes/url');
const app =express();
const PORT =8000;

const atlasUrl = process.env.MONGODB_ATLAS_URL;


connectMongodb(atlasUrl)
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));
  
  app.set("view engine","ejs");
  app.set("views",path.resolve("./views"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/url',urlRouter);

app.listen(PORT,()=>console.log("Server is running at ",PORT))