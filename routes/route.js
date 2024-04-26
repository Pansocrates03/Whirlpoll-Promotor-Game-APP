/*
    En este archivo se encuentran las rutas del API
*/

const express = require('express');     // Framework en el que se desarrolla el api
const router = express.Router();        // Mantiene las funciones get/post en archivos separados
const fs = require("fs")
//const path = require("path")
var sql = require("mssql");
const multer = require("multer");
const path = require("path")

dbConfig = require("../database/db.config")     // Información de la base de datos



//////////// SETTING UP THE GETTERS ////////////

const getQueryController = require('../controllers/getQueryController.js');

router.get("/",getQueryController.main);                            // Página de prueba
router.get("/api/getEmpleados", getQueryController.getEmpleados);   // Devuelve los empleados
router.get("/api/getReportes", getQueryController.getReportes);     // Devuelve los reportes con los FK implementados
router.get('/api/getImage/:path', getQueryController.getImage);     // Devuelve UNA imagen

//////////// SETTING UP THE SETTERS ////////////

const upload = multer ({ dest: "uploads"})
const postQueryController = require("../controllers/postQueryController.js");

<<<<<<< HEAD
router.post("/api/newReport", upload.single("file"), postQueryController.newReport);
router.post("/api/updateReport", upload.none(), postQueryController.updateReport);   
=======
router.post("/api/newReport", upload.single("file"), postQueryController.newReport);    // Crea un nuevo reporte
router.post("/api/updateReport", upload.none(), postQueryController.updateReport);      // Le da puntos al empleado, y cambia el status
>>>>>>> 64452d815b6d9f28a08da760e348122e71964c78

module.exports = router