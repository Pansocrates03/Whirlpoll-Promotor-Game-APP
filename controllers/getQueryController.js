const fs = require("fs");
var sql = require("mssql");
dbConfig = require("../database/db.config");
const path = require("path");
const pckge = require("../package.json")


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
        res.send(`Currently running v${pckge.version}`);
    }

    async getEmpleados(req,res){
        GetQuery("SELECT * FROM empleado").then((value) => {
            res.send(value)
        })
    }

    async getReportes(req,res){
        var qry = "EXEC getReports"
        GetQuery(qry).then((value) => {
            res.send(value)
        })
    }

    async getImage(req,res){
        
        fs.readFile(`public/images/${req.params.path}`,(err,data)=>{
            if (err) console.log(err);
            else {
                res.contentType('image/png')
                res.send(data); // Set disposition and send it.
                res.end();
                
            }
        });   
    }
}

const getters = new MainController()
module.exports = getters;