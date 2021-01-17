const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //revidar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array() })
    }

    try{
        //crear nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar el creador via jwt
        proyecto.creador = req.usuario.id;

        proyecto.save();
        res.json(proyecto);

    }catch(error){
        console.log(error);
        res.status(500).json({message:'hubo un error..!!'});
    }
};

//obtine todos los proyectos usuario acctual
exports.obtenerProyectos = async (req, res) => {

    try{
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos});
    }catch(error){
        console.log(error);
        res.status(500).send('hubo un error..!');
    }
}

//actualizar proyecto
exports.actualizarProyecto = async(req, res)=>{

    //revidar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array() })
    }

    // extraer informacion del proyecto 
    const {nombre} = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }
    try{
        // revisar id
        let proyecto = await Proyecto.findById(req.params.id);
        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({message:'proyecto No Encontrado'})
        }

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({message:'No Autorizado.!!'});
        }
        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id},
            {$set:nuevoProyecto},
            {new:true}
            );
            res.json({proyecto});
    }catch(error){
        console.log(error);
        res.status(500).send('hubo un error..!');
    }
}

//eliminar proyecto
exports.eliminarProyecto = async(req, res)=>{

    try{
        // revisar id
        let proyecto = await Proyecto.findById(req.params.id);

        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({message:'proyecto No Encontrado'})
        }

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({message:'No Autorizado.!!'});
        }

        //eliminar proyecto
        await   Proyecto.findOneAndRemove({_id: req.params.id});
        res.json({message:'Proyecto eliminado con exito..!!'});
    }catch(error){
        console.log(error);
        res.status().send('Error en el servidor');
    }
}