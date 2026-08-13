const express = require("express");
const cors = require("cors");
const ConnectDb = require("./config/db");
require("dotenv").config();

app = express();

app.use(cors());
app.use(express.json());

ConnectDb()

app.get("/",(req,res)=>{
    console.log("PROJECT HUB API IS RUNNING")
});

const PORT = process.env.port || 5000;

app.listen('PORT',()=>{
    console.log(`Server is Running on PORT ${PORT} ✅`)
});