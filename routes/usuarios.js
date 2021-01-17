//rutas para agregar usuarios
const express =  require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

//crear usuario
//api/usuario
router.post('/',
    [
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('email','agregar email valido').not().isEmpty(),
        check('password','el password debe ser Minino de 6 caracteres').isLength({min:6})

    ],
usuarioController.crearUsuario
);

module.exports = router;