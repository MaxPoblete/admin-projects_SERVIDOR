const express = require('express');
const router = express.Router();
const  tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear una tarea
router.post('/',
auth,
[
    check('nombre', 'el nombre es Obligatorio').not().isEmpty(),
    check('proyecto', 'el proyecto es Obligatorio').not().isEmpty()
],

tareaController.crearTarea
);

//obtener lista de tareas de un proyecto por id
router.get('/',
auth,
tareaController.obtenerTarea
);

//actualizar tarea 
router.put('/:id',
auth,
tareaController.actualizarTarea
);

//eliminar tarea 
router.delete('/:id',
auth,
tareaController.emiminarTarea
);

module.exports = router;
