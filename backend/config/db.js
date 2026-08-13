const mongoose = require("mongoose")

const ConnectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected Sucessfully ✅");
    }
    catch(error){
        console.log("Failed to Connect MongoDb ❌",error.message);
        process.exit(1);
    }
};

module.exports = ConnectDb;