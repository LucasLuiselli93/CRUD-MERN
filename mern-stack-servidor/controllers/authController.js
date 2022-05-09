const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator") 
const jwt = require("jsonwebtoken")

exports.autenticarUsuario = async(req,res) => {
       // reviso si hay errores
       const errores = validationResult(req);

       if(!errores.isEmpty() ) {
           return res.status(400).json({errores:errores.array()})
       }

       //extraer el email y pass

       const {email,password} = req.body

       try {
           // Revisar usuario registrado

           let usuario = await Usuario.findOne({email})
           if(!usuario){
               return res.status(400).json({msg:"El usuario no existe"})
           }

           const passCorrecto = await bcryptjs.compare(password, usuario.password);
           if(!passCorrecto){
               return res.status(400).json({msg:"Password Incorrecto"})
           }

      

           //crear y firmar token
        const payload ={
            usuario:{
                id:usuario.id,
                
            }
        }

        //firmar token
        jwt.sign(payload, process.env.PALABRA,{
                expiresIn: 360000
        }, (error,token)=>{
            if(error) throw error

            res.json({token})
        })
        

       } catch (error) {
           console.log(error)
       }
}