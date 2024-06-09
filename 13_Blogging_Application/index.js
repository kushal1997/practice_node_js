const express=require("express");
const path=require('path');
require('dotenv').config();

const { connectMongodb } = require("./config/mongoose");
const staticRouter=require('./routes/staticRoute');
const userRouter=require("./routes/user");
const blogRouter=require("./routes/blog");
const commentRouter=require("./routes/comment");

const cookieParser=require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app=express();
const PORT=8000;

const atlasUrl = process.env.MONGODB_ATLAS_URL;

connectMongodb(atlasUrl)
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',staticRouter);
app.use("/user",userRouter);
app.use("/blog",blogRouter);
app.use('/blog', commentRouter);

app.listen(PORT,()=>console.log("Server is running at PORT :",PORT))