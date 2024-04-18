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


//////////// SETTING UP THE SETTERS ////////////

function insertData(qry) {
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            
            request.query(qry)
            .then(function     () {
                transaction.commit().then(function (resp) {
                    console.log(resp);
                    dbConn.close();
                }).catch(function (err) {
                    console.log("Error in Transaction Commit " + err);
                    dbConn.close();
                });
            }).catch(function (err) {
                console.log("Error in Transaction Begin " + err);
                dbConn.close();
            })
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        }).catch(function (err) {
        //12.
        console.log(err);
    });
  });
}   


const postQueryController = require("../controllers/postQueryController.js");

router.post("/api/test", postQueryController.test);

// Este POST ya inserta la informacion a la tabla reporte mientras la información se mande a través de url-encoded
router.post('/api/newReport', function(req,res){
    ubicacion = parseInt(req.body.ubicacion);
    motivo = parseInt(req.body.motivo);
    descripcion = req.body.descripcion;
    //fechageneracion = new sql.Date()
    estatus = parseInt(req.body.estatus);
    generadopor = parseInt(req.body.generadopor);
    console.log(req.body)

    if (ubicacion && motivo && estatus && generadopor) {
        qry = `INSERT INTO reporte(generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (${req.body.generadopor},1,${req.body.ubicacion},${req.body.motivo},GETDATE(),'${req.body.descripcion}')`
        insertData(qry)
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
    
}
);

// Upload images (no se ha terminado aun)
const upload = multer ({ dest: "uploads"})

router.post("/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;

      fs.rename(tempPath,tempPath + ".png",function(err){
        if(err){
            console.log("err", err);
            res.status(500);
        }
        res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
      })

    }
  );



module.exports = router