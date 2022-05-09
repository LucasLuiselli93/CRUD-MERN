// El model es la parte que interactua con la base de datos

const mongoose = require ("mongoose")

// definir el modelo de  base de dats con schema
const UsuarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    registro:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Usuario",UsuarioSchema)