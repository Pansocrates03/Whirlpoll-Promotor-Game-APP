/*
    API de aplicación para whirlpool
    Autor: Esteban Sierra Baccio
    Ultima version: 17 de abril del 2024
*/

// npm update
var express = require("express");               // Se desarrolla el API en este framework
var bodyParser = require("body-parser");        // Obtiene el body del http Request
var cors = require('cors');                     // NPI de para qué lo usamos
const router = require("./routes/route.js");    // Las rutas del API


// Se inicia la app
var app = express(); 

// NPI de que hace esto, pero es necesario
app.use(cors());

// Nos permite recibir un body de tipo urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Nos permite recibir un body de tipo JSON
app.use(bodyParser.json());

// Se inicia el servidor en el puerto 8080
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`App now running Locally on: http://localhost:${port}`);
 });

// Makes the "public" carpeta be acces for everyone
app.use(express.static('public'));

// Se inician los links del API
app.use(router)