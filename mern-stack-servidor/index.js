const express = require ("express")
const conectarDb = require ("./config/db")

// crear el servidor
const app = express()

//conectar a la base de datos
conectarDb()

// habilitar express.json para leer los datos del usuario
app.use(express.json({extended:true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use("/api/usuarios", require("./routes/usuarios"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/proyectos", require("./routes/proyectos"))


//definir pagina principal
app.get("/",(req,res)=>{
    res.send("Hola mundo")
})

// arrancar la app, escuchador
app.listen(PORT,() =>{
console.log(`El servidor funciona en el puerto ${PORT}`)
})