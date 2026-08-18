const express = require("express");
const cors = require("cors");
const ConnectDb = require("./config/db");
require("dotenv").config();
const path = require("path");

const authroutes = require('./routes/authroute')
const projectRoutes = require("./routes/projectRoutes");
const datasetRoutes = require("./routes/datasetRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static(path.join(__dirname, "uploads")));
ConnectDb()

app.get("/",(req,res)=>{
    console.log("PROJECT HUB API IS RUNNING")
});

app.use('/api/auth',authroutes)
app.use("/api/projects", projectRoutes);
app.use("/api/datasets", datasetRoutes);
app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/users",
  userRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT} ✅`)
});