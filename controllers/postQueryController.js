var sql = require("mssql");
dbConfig = require("../database/db.config");
const fs = require("fs");


// Función para hacer un INSERT a la base
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

function GetQuery(qry) {
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

function getFilename(fullPath) {
    return fullPath.replace(/^.*[\\\/]/, '');
}


// Controlador principal
class MainController {

    async newReport(req,res){

      const tempPath = req.file.path; //image name
      const ubi = parseInt(req.body.ubicacion);
      const mot = parseInt(req.body.motivo);
      const desc = req.body.descripcion;
      const gen = parseInt(req.body.generadopor);

      console.log("El path original de la imagen es:", tempPath);

      let fileName = (tempPath+".png");

      console.log("El nuevo nombre es:", fileName);

      fs.rename(tempPath,fileName,function(err){
        if(err){
            console.log("err", err);
            res.status(500);
        }        

        fileName = getFilename(fileName);
        console.log("El nombre del archivo es:", fileName);

        let qry;

        if (ubi && mot && gen) {
            qry = `INSERT INTO reporte(generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) OUTPUT Inserted.ID VALUES (${gen},1,${ubi},${mot},GETDATE(),'${desc}')`
            insertData(qry)
        }
        else res.sendStatus(400);

        GetQuery("SELECT id FROM reporte WHERE id = ( SELECT max(id) FROM reporte );").then((value) => {
            let algoBien = parseInt(value.recordset[0].id) + 1;
            insertData("INSERT INTO imagen (idreporte,link) VALUES ("+ algoBien +",' " + fileName + " ');");
        })

        res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
      })
        
    }

    async updateReport(req,res){
        let userID = req.body.userID;
        let points = req.body.points;
        
        if (parseInt(userID) && parseInt(points)){
            insertData(`UPDATE empleado SET puntos = puntos + ${points} WHERE id = ${userID};`);
            res
                .status(200)
                .contentType("text/plain")
                .end("infoDone");
        } else {
            res
                .status(500)
                .contentType("text/plain")
                .end("error");
        }
    }

}



const postControllers = new MainController()
module.exports = postControllers;