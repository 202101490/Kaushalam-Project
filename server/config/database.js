const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect("mongodb+srv://vimalsonagara978:fVrgkRvBzClmJYxv@cluster0.oqrvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then( () =>  {console.log("Db Connected successfully");})
    .catch((error) => { 
        console.log("Db connection falied");
        console.error(error);
        process.exit(1);
    })
};