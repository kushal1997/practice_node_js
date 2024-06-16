const http=require("http")
const express=require("express");
const staticRoutes=require("./routes/staticRoutes")
const {Server}=require("socket.io")

const app =express();
const PORT =8000;

const server=http.createServer(app);
const io=new Server(server);

//socket.io
io.on('connection', (socket) => {
    socket.on("chat-msg",(message)=>{
      io.emit("chat-msg",message)
    })
  });

app.use(express.static('./public'));

app.use('/',staticRoutes);

server.listen(PORT,()=>console.log("Server is running at PORT:",PORT))