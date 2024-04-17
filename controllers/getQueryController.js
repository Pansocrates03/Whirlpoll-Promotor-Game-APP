var sql = require("mssql");
dbConfig = require("../database/db.config")


// Función para obtener información de la base de datos
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


// Controlador principal
class MainController {

    async main(req,res){
        res.send("wassup bitch");
    }

    async getEmpleados(req,res){
        GetQuery("SELECT * FROM empleado").then((value) => {
            res.send(value)
        })
    }

    async getReportes(req,res){
        var qry = "SELECT reporte.id,empleado.nombre AS nombreEmpleado,ubicacion.nombre AS ubicacion,motivoreporte.descripcion AS motivo,fechageneracion,reporte.descripcion FROM reporte INNER JOIN empleado ON empleado.id = reporte.generadopor INNER JOIN ubicacion ON ubicacion.id = reporte.ubicacion INNER JOIN motivoreporte ON motivoreporte.id = reporte.motivo"
        GetQuery(qry).then((value) => {
            res.send(value)
        })
    }
}



const getters = new MainController()
module.exports = getters;