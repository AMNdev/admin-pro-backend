// Rutas de: '/api/usuarios'

const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarAdminRole,validarAdminRoleOMismoUsuario } = require("../middlewares/validar-JWT");

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");

const router = Router();


router.get('/', validarJWT, getUsuarios);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'Se necesita un email válido').isEmail(),
    validarCampos
    ],
    crearUsuario
);


router.put('/:id', [
    validarJWT,
    validarAdminRoleOMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Se necesita un email válido').isEmail(),
    check('role', 'El role obligatorio').notEmpty(),
    validarCampos,
    

    ],
    actualizarUsuario
);



router.delete('/:id',
    [validarJWT, validarAdminRole],
    borrarUsuario
);





module.exports = router;