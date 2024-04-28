/*
    En este archivo se encuentran las rutas del API
*/

const express = require('express');     // Framework en el que se desarrolla el api
const router = express.Router();        // Mantiene las funciones get/post en archivos separados
const multer = require("multer");       // Permite mandar archivos a través del POST API

dbConfig = require("../database/db.config")     // Información de la base de datos



//////////// SETTING UP THE GETTERS ////////////

const getQueryController = require('../controllers/getQueryController.js');

router.get("/",getQueryController.main);                            // Página de prueba
router.get("/api/getEmpleados", getQueryController.getEmpleados);   // Devuelve los empleados
router.get("/api/getReportes", getQueryController.getReportes);     // Devuelve los reportes con los FK implementados
router.get('/api/getImage/:path', getQueryController.getImage);     // Devuelve UNA imagen

//////////// SETTING UP THE SETTERS ////////////

const upload = multer ({ dest: "./public/images"})
const postQueryController = require("../controllers/postQueryController.js");

router.post("/api/newReport", upload.single("file"), postQueryController.newReport);    // Crea un nuevo reporte
router.post("/api/updateReport", upload.none(), postQueryController.updateReport);      // Le da puntos al empleado, y cambia el status

//////////// SETTING UP THE DELETE ////////////
const deleteQueryController = require("../controllers/deleteQueryController.js");

router.delete('/deleteQueryController', deleteQueryController.restartDB);

module.exports = router