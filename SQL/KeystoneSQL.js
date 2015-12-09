var sql = require('mssql');
var mysql = require('mysql');
//--------------------------------------mysql----------------------------------
var KeystoneMysql = {
  createNew: function(config){
　    var keystonemysql = {};
      try {
        keystonemysql.mysql_pool=mysql.createPool(config);
      } catch (e) {
        console.log("connect err");
        return null;
      } finally {
        console.log("---keystonemysql---");
      }

　　　keystonemysql.queryMysqlDatabase = function(querystring, callbackfun, datatype){
        if (keystonemysql.mysql_pool) {
          keystonemysql.mysql_pool.getConnection(function(err, connection) {
            connection.query(querystring, function(err, result) {
                if(err){
                    callbackfun(err)
                  }
                result.datatype=datatype;
                callbackfun(null,result)
                connection.release();
            });
          });
        }
        else {
          return callbackfun("no mysql database config");
        }
      };

      keystonemysql.getDatabase = function(callbackfun){
        var sqlstring = 'SELECT table_schema AS DB_NAME from information_schema.`TABLES` group by table_schema;';
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun,"database")
        //console.log("---keystonemysql.getDatabase---");
      };

      keystonemysql.getDataTable = function(database,callbackfun){
        var sqlstring = "SELECT TABLE_NAME from information_schema.`TABLES` WHERE TABLE_SCHEMA='"+database+"';";
        //console.log(sqlstring);
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun,"table");
        //console.log("---keystonemysql.getDataTable---");
      };

      keystonemysql.getTableFileds = function(database,table,callbackfun){
        //console.log("---keystonemysql.getTableFileds---");
        var sqlstring = "SELECT COLUMN_NAME,DATA_TYPE from information_schema.columns where table_schema = '"+database+"' and table_name='"+table+"';";
        //console.log(sqlstring);
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun,"column");
      };
      //return the class
　　　return keystonemysql;
　　}
};
//--------------------------------------mssql----------------------------------
var KeystoneMssql = {
  createNew: function(config){
　    var keystonemssql = {};
      keystonemssql.mssql_config=config;

　　　keystonemssql.queryDatabase = function(querystring, callbackfun,datatype){
        if (keystonemssql.mssql_config) {
            var connection = new sql.Connection(keystonemssql.mssql_config, function(err) {
            // ... error checks
            // Query
            var request = new sql.Request(connection); // or: var request = connection.request();
            request.query(querystring, function(err, recordset) {
                // ... error checks
                if(err)
                {
                  return callbackfun(err);
                }
                //console.dir(recordset);
                recordset.datatype=datatype;
                callbackfun(null,recordset)
                });
            });

            connection.on('error', function(err) {
            // ... error handler
            callbackfun(err);
          });
        }
        else {
          return callbackfun("no database config");
        }
      };

      keystonemssql.getDatabase = function(callbackfun){
        var sqlstring="SELECT name AS DB_NAME FROM master.dbo.sysdatabases WHERE status <> 512";
        keystonemssql.queryDatabase(sqlstring,callbackfun,"database");
        //console.log("---keystonemssql.getDatabase---");
      };

      keystonemssql.getDataTable = function(database,callbackfun){
        var sqlstring = "USE "+database+"; SELECT name AS TABLE_NAME FROM dbo.sysobjects WHERE OBJECTPROPERTY(id,N'IsUserTable') = 1 AND name <> 'dtproperties'";
        //console.log(sqlstring);
        keystonemssql.queryDatabase(sqlstring,callbackfun,"table");
        //console.log("---keystonemssql.getDataTable---");
      };

      keystonemssql.getTableFileds = function(database,table,callbackfun){
        var sqlstring = "USE "+database
        +"; SELECT a.name AS COLUMN_NAME,b.name AS DATA_TYPE FROM syscolumns AS a JOIN systypes AS b ON a.xtype = b.xusertype WHERE id=object_id('"
        +table+"');";
        //console.log(sqlstring);
        keystonemssql.queryDatabase(sqlstring,callbackfun,"column");
        //console.log("---keystonemssql.getTableFileds---");
      };
      //return the class
　　　return keystonemssql;
　　}
};
//-------------------------------------KeystoneSQL----------------------------
var KeystoneSQL = {
  createNew: function(engintype, config){
    if(engintype=="mysql"){
      var mysql=KeystoneMysql.createNew(config);
      mysql.databasetype="mysql";
      return mysql;
    }else if(engintype=="mssql"){
      var mssql=KeystoneMssql.createNew(config);
      mssql.databasetype="mssql";
      return mssql;
    }
  }
};

module.exports=KeystoneSQL;
