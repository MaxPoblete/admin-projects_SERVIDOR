const express = require('express');
const router = express.Router();
const  proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


//crear proyecto
//api/proyectos

//agregar proyecto
router.post('/',
auth,
[
    check('nombre','el nombre de proyecto es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto);

//obtener Proyectos
router.get('/',
auth,
proyectoController.obtenerProyectos);

//actualizar Proyectos
router.put('/:id',
auth,
[
    check('nombre','el nombre de proyecto es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto);

//eliminar un proyecto
router.delete('/:id',
 auth,
 proyectoController.eliminarProyecto
)

module.exports = router;