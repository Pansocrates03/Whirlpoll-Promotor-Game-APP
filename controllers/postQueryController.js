var sql = require("mssql");
dbConfig = require("../database/db.config")


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


// Controlador principal
class MainController {

    async test(req,res){
        res.send("tudo bem")
    }

    async newReport(req,res){
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

}



const getters = new MainController()
module.exports = getters;