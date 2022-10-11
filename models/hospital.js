const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' }); //con eso cambio el nombre a la colección en la bd


HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();

    return object;

    // config global para cambiar _id por uid y no mostrar version de mongo ni password
})

module.exports = model('Hospital', HospitalSchema);