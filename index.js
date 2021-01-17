const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();

//use cross
app.use(cors());

//conectar a bd
conectarDB(); 

// habilitar express.json
app.use(express.json({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/task', require('./routes/tareas'));

app.get('/',(req, res)=>{
    res.send('Server corriendo..!!!');
})

//definir la pagina principal
//arrancar app
app.listen(PORT,()=>{
    console.log(`[el servidor esta funcionando en el puerto: ${PORT} ]`);
    console.log(`http://localHost:4000/`);
});

