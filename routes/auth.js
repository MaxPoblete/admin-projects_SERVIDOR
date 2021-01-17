//rutas para autenticar usuarios
const express =  require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');

// api/auth
router.post('/',
    [
        check('email','agregar email valido').not().isEmpty(),
        check('password','el password debe ser Minino de 6 caracteres').isLength({min:6})

    ],
    authController.autenticarUsuario
);

module.exports = router;