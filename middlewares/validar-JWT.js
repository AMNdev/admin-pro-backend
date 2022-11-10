const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = (req, res, next) => {
    // leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Falta el token'
        })
    }

    // verificar token
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }



}

const validarAdminRole = async (req, res, next) => {

    const uid = req.uid

    try {
        const usuarioDB = await Usuario.findById(uid)

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Acción NO Autorizada'
            })
        }

        next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con administrador'
        })
    }
}


const validarAdminRoleOMismoUsuario = async (req, res, next) => {

    const uid = req.uid
    const id = req.params.id;


    try {
        const usuarioDB = await Usuario.findById(uid)

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Acción NO Autorizada'
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con administrador'
        })
    }
}





module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
}