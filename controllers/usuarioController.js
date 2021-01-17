const Usuario = require('../models/Usuario');
const bcriptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) =>{

    //revidar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array() })
    }
    //extraer email y password
    const{email, password} = req.body;

    try{
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(400).json({message:'El Usuario ya Existe'});
        }
        //crear  nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcriptjs.genSalt(10);
        usuario.password = await bcriptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar jwt
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, 'SECRETA', {
            expiresIn: 3600000
        }, (error, token)=>{
            if(error) throw error;
               res.json({token});
        });

        
    }catch(error){
        console.log(error);
        res.status(400).send('hubo un error');
    }
}
