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

router.get("/",getQueryController.main);
router.get("/api/getEmpleados", getQueryController.getEmpleados);
router.get("/api/getReportes", getQueryController.getReportes);
router.get('/api/getImage/:path', getQueryController.getImage);


//////////// SETTING UP THE SETTERS ////////////

const upload = multer ({ dest: "uploads"})
const postQueryController = require("../controllers/postQueryController.js");


router.post("/api/test", postQueryController.test);
router.post("/api/newReport", upload.single("file"), postQueryController.newReport);
router.post("/api/updateReport", upload.none(), postQueryController.updateReport);   

module.exports = router