const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    //leer el token del header
    const token = req.header('x-auth-token');

    console.log(token);

    //Revisar Si no hay Token
    if(!token){
        return res.status(401).json({message:'no hay token, permiso no valido'});
    }

    //validar el token
    try{
        const cifrado = jwt.verify(token, 'SECRETA');
        req.usuario = cifrado.usuario;
        next();
    }catch(error){
        res.status().json({message:'el token no es valido'});
    }
}