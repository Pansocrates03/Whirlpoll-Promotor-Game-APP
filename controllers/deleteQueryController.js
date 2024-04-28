const fs = require("fs");
var sql = require("mssql");
dbConfig = require("../database/db.config");
const path = require("path");
const pckge = require("../package.json")

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

class MainController {
    async restartDB(req,res){
        GetQuery("DELETE FROM imagen; DELETE FROM reporte;");
        console.log("Deleted table 'imagen'");
        console.log("Deleted table 'reporte'");
        res.status(200);

    }
}

const del = new MainController()
module.exports = del;