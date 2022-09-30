// controlador de la información que se obtiene de bd usuarios

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// Obtener usuarios

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        msg: usuarios,
    }
    )

}


// Crear usuarios

const crearUsuario = async (req, res = response) => {
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email})
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // generar token -jwt
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        }
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inerperado: revisar logs'
        })
    }


}


// Actualizar usuario

const actualizarUsuario = async (req, res=response) => {
    
    // TODO: Validar token y comprobar que el usuario es el correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningún usuario con el id proporcionado'
            });
        }
        
        // Actualizaciones
        // const campos =req.body  -- optimizado
        const {password , google, email, ...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email })

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya hay un usuario con ese email'
                });
            }
        }

        campos.email = email;

        // delete campos.password;
        // delete campos.google;
        // los borro de la info que acabo de obtener porque no son campos que quiera modificar
        // ya no es necesario porque desestructuro los campos arriba

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de actualización de usuario'
        })
    }

}


// Borrar usuarios

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningún usuario con el id proporcionado'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado definitivamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });

    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}




