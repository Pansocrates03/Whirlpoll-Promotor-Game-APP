/*
    API de aplicación para whirlpool
    Esteban Sierra Baccio
    Ultima version: 13 de abril del 2024
*/

// npm update
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require('cors');
const multer = require("multer");
var app = express(); 
// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(cors());


//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`App now running on http://localhost:${port}`);
 });

 // Setting up the database
 var dbConfig = {
    user:  "Pansocrates03_SQLLogin_1",
    password: "oh3oumfqif",
    server: "WhirlPromoApp.mssql.somee.com",
    database: "WhirlPromoApp",
    options: {
        trustServerCertificate: true,
    }
};

// Setting up the getters
app.get("/",function(req,res){
    res.send("Hola perra");
});

app.get("/api/getEmpleados", function(req , res){
    
    dbQuery("SELECT * FROM empleado").then((value) => {
        res.send(value)
    })

})

app.get("/api/getReportes", function(req,res){
    qry = "SELECT reporte.id,empleado.nombre AS nombreEmpleado,ubicacion.nombre AS ubicacion,motivoreporte.descripcion AS motivo,fechageneracion,reporte.descripcion FROM reporte INNER JOIN empleado ON empleado.id = reporte.generadopor INNER JOIN ubicacion ON ubicacion.id = reporte.ubicacion INNER JOIN motivoreporte ON motivoreporte.id = reporte.motivo"
    dbQuery(qry).then((value) => {
        res.send(value)
    })
})

function dbQuery(qry) {
    var dbConn = new sql.ConnectionPool(dbConfig);
    return dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        return request.query(qry).then(function (resp) {
            //console.log(resp);
            dbConn.close();
            return resp
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}

//POST API
app.post("/api/v1/employee", function(req , res){
    insertEmployees()
    res.send("done")
});

app.post("/api/prueba",function(req,res){
    console.log("lol")
    console.log(req.body)
    res.json(req.body)
    
})


const upload = multer ({ dest: "uploads"})


app.post("/upload",function(req,res){
    res.send("Upload Succesfully")
})


function insertEmployees() {
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.query("INSERT INTO empleado (nombre,rol,puntos) VALUES ('Jose Mauricio Olivares',5,100000);")
            .then(function     () {
                transaction.commit().then(function (resp) {
                    console.log("lol")
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