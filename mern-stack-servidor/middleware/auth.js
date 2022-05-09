const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){
    //Leer token del header
    const token = req.header("x-auth-token")
    console.log(token)


    // Revisar si no hay token
    if(!token){
        return res.status(401).json({msg:"no hay token, permiso no valido"})
    }


    try {
        const cifrado = jwt.verify(token,process.env.PALABRA)
        req.usuario = cifrado.usuario
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:"Token no valido"})
    }
}