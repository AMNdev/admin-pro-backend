// Rutas de: '/api/loogin'


const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token', 'Necesario token de Google').notEmpty(),
        validarCampos
    ],
    googleSignIn
)




module.exports = router;