const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // encontrar el email del usuario en la BD
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }


        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }


        // generar token -jwt

        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        // creación de usuario en db
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        // guardar en db
        await usuario.save();


        // generar token -jwt
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            email, name, picture,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google Incorrecto'
        })
    }



}


const renewToken = async (req, res=response) => {

    const uid = req.uid;
    const usuario = await Usuario.findById( uid );



    // generar token -jwt
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        usuario,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}