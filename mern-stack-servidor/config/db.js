const mongoose = require("mongoose")
require("dotenv").config({path:"variables.env"});

const conectarDb = async () =>{
try {
    await mongoose.connect("mongodb+srv://LucasLuiselli:ouuUAUbiUNhYo1tc@cluster0.onujn.mongodb.net/merncrud",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       // useFindAndModify:false
    })
    console.log("db conectada")
} catch (error) {
    console.log(error)
    process.exit(1)//detener app
}
}

module.exports = conectarDb