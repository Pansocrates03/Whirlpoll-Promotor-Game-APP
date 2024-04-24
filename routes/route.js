/*
    En este archivo se encuentran las rutas del API
*/

const express = require('express');     // Framework en el que se desarrolla el api
const router = express.Router();        // Mantiene las funciones get/post en archivos separados
const multer = require("multer");

//////////// SETTING UP THE GETTERS ////////////

const getQueryController = require('../controllers/getQueryController.js');

router.get("/",getQueryController.main);
router.get("/api/getEmpleados", getQueryController.getEmpleados);
router.get("/api/getReportes", getQueryController.getReportes);
router.get('/api/getImage/:path', getQueryController.getImage);


//////////// SETTING UP THE SETTERS ////////////

const postQueryController = require("../controllers/postQueryController.js");
const upload = multer ({ dest: "uploads"})

router.post("/api/test", postQueryController.test);
router.post("/api/newReport", upload.single("file"), postQueryController.newReport);


module.exports = router