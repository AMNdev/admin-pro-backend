require('dotenv').config();
const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express()

// base de datos
dbConnection();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// console.log(process.env);

// HpHCOQzRsJ8u156q
// mean_user

// admin:admin

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));






app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
