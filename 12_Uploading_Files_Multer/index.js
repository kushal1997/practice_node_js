const path=require('path');
const express=require('express');

const staticRouter =require('./routes/staticRouter');
const fileRouter=require('./routes/file');
const app=express();
const PORT=8000;


app.set('view engine',"ejs");
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',staticRouter);
app.use('/file',fileRouter);

app.listen(PORT,()=>console.log("Server is running at ",PORT))