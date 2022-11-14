require('dotenv').config();
const path = require('path');
const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express()

// base de datos
dbConnection();

// Configurar CORS
app.use(cors());

// Carpeta Pública
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json());

// console.log(process.env);

// HpHCOQzRsJ8u156q
// mean_user

// admin:admin

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.use('/api/login', require('./routes/auth'));


// lo último
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
