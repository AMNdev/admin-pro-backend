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

// console.log(process.env);

// HpHCOQzRsJ8u156q
// mean_user

// admin:admin

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok : true,
        msg : 'Hola mundo'}
    )
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
