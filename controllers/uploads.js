const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require('fs');


const fileUpload = (req, res = response) => {

    const { tipo, id } = req.params;

    // validar los tipos
    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'error de tipo - medicos/usuarios/hospitales'
        });
    }

    // Validar que existe el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Ningún archivo subido'
        });
    }


    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.toLowerCase().split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no válida'
        });
    }

    // generar nombre de archivo (UUID)
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // path para guardar archivos
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen
    file.mv(path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar imagen'
            });
        }

        // Actualizar base de datos ( con Helper )
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido correctamente',
            nombreArchivo
        })
    });


}

const retornaImagen = (req, res = response) => {
    const { tipo, foto } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    const noFoto = path.join(__dirname, `../uploads/no-foto.jpg`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(noFoto);
    }
}




module.exports = {
    fileUpload,
    retornaImagen
}