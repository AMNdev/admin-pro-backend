// file system
const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    // comprobar si hay imagen previa y borrar
    if (fs.existsSync(path)) {
        // borrar imagen
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            // encontrar medico por su id
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('ID de medico no existe');
                return false;
            }

            // comprobar si hay imagen previa y borrar
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo)

            // asignar y guardar
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            


        break;

        case 'hospitales':
            
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('ID de hospital no existe');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo)

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            


        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('ID de usuario no existe');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo)

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            

        break;

        
    }

}



module.exports = {
    actualizarImagen
}

