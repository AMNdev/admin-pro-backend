const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' }); //con eso cambio el nombre a la colección en la bd


MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();

    return object;

    // config global para cambiar _id por uid y no mostrar version de mongo ni password
})

module.exports = model('Medico', MedicoSchema);