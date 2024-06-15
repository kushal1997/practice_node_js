const express = require("express");
const { connectMongodb } = require("./config/db");
const cors = require('cors');
const projectRoutes = require("./routes/projectRoutes");
require("dotenv").config();

const app = express();
const PORT = 8000;

const atlasUrl = process.env.MONGO_URI;

connectMongodb(atlasUrl)
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", projectRoutes);

app.listen(PORT, () => console.log("Server is running at PORT :", PORT));
