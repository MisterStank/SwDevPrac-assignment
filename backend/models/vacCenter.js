const sql = require("../config/vacCenterDB");

const Vaccenter = function(vaccenter){
    this.id = vaccenter.id;
    this.name = vaccenter.name;
    this.tel = vaccenter.tel;
};

Vaccenter.getAll = result =>{
    sql.query("SELECT * FROM vacCenters;" , (err,res) =>{
        if(err){
            console.log("error : ",err);
            result(err,null);
            return;
        }
        console.log("vacCenters: ",res);
        result(null,res);
    });
};

module.exports = Vaccenter;