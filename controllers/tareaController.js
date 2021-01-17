const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');
const { json } = require('express');

exports.crearTarea = async (req, res) => {

    
    //revidar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array() })
    }
    try{ 
        //Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto  = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({message:'Proyecto no encointrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({message:'No Autorizado'});
        }

        //creamos la tarea 
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Hubo Un error En la Peticion'});

    }

}

//obtener tareas
exports.obtenerTarea = async(req, res)=>{

    try{
        //Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto  = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({message:'Proyecto no encointrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({message:'No Autorizado'});
        }

        const tareas = await Tarea.find({proyecto});
        res.json({tareas});

    }catch(error){
        console.log(error);
        res.status(500).json({message:'hubo un error en la peticion..!'});
    }
}

exports.actualizarTarea = async(req, res)=>{
    console.log('estado ::::'+ req.body.estado);

    try{
        
        //Extraer el Proyecto y comprovar Si Existe
        const {proyecto, nombre, estado} = req.body;
        
        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            res.status(404).json({message:'tarea no existe'});
        }
        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({message:'No Autorizado'});
        }
        //crear un objeto con la nueva informacion
        const nuevaTarea = {};

        if(estado)nuevaTarea.estado = estado;
        if(nombre)nuevaTarea.nombre = nombre;
            
        //guardar tarea 
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id },
             nuevaTarea,
             {new:true}
             );

            res.json({tarea});
            console.log(tarea);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Hubo un error en la peticion'});
    }
}

//eliminar tarea
exports.emiminarTarea = async(req, res)=>{

    try{

        //Extraer el Proyecto y comprovar Si Existe
        const {proyecto} = req.body;
        
        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            res.status(404).json({message:'tarea no existe'});
        }
        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({message:'No Autorizado'});
        }

        //eliminar tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({message:'tarea eliminada con exito'});

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Hubo Un error en la peticion'});
    }
}