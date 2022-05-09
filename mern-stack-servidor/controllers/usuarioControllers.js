// El controller toma las req y res pero la vista se da con react

const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator") 
const jwt = require("jsonwebtoken")

exports.crearUsuario = async (req,res) =>{

    // reviso si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty() ) {
        return res.status(400).json({errores:errores.array()})
    }

    const {email,password} = req.body

   
    try {
        
        // reviso que el usuario sea unico con la propiedad email
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:"El usuario ya existe"})
        }

        //creo el nuevo usuario
        usuario = new Usuario(req.body)

       
    
        // Una vez chequeado que si el usuario  existe o no hay que hashearlo--> 
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password,salt)


        //guardar uysuario
        await usuario.save()


        //crear y firmar token
        const payload ={
            usuario:{
                id:usuario.id,
                
            }
        }

        //firmar token
        jwt.sign(payload, process.env.PALABRA,{
                expiresIn: 3600
        }, (error,token)=>{
            if(error) throw error

            res.json({token:token})
        })
        

     

        
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
   
    


}