const Proyecto = require("../models/Proyecto")

const {validationResult} = require("express-validator") 

exports.crearProyecto = async (req,res)=>{


       // reviso si hay errores
       const errores = validationResult(req);

       if(!errores.isEmpty() ) {
           return res.status(400).json({errores:errores.array()})
       }

try {

    // crear nuevo proyecto

    const proyecto = new Proyecto(req.body);
    
    // Guardar el creador del proyecto
    proyecto.creador = req.usuario.id

    proyecto.save();
    res.json(proyecto)


    
} catch (error) {
    console.log(error);
    res.status(500).send("hubo un error")
}

}

//obteber todos los proyectos del usuario actual

exports.obtenerProyectos = async (req,res)=>{
    try {

        const proyectos = await Proyecto.find({creador:req.usuario.id})
        res.json({proyectos})

        
    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error")
    }
}


