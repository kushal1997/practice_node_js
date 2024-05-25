const express = require("express");
const { connectMongodb } = require("./config/mongoose");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

connectMongodb("mongodb://127.0.0.1:27017/practice_nodejs")
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));

//middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//ROUTES

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
