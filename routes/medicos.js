// Rutas de '/api/medicos'




const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");


const { validarJWT } = require("../middlewares/validar-JWT");

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');


const router = Router();


router.get('/', getMedicos);


router.post('/',
    [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').notEmpty(),
    check('hospital', 'ID del hospital inválida').isMongoId(),
    validarCampos
    ],
    crearMedico
);


router.put('/:id',
    [],
    actualizarMedico
);



router.delete('/:id',
    borrarMedico
);










module.exports = router;