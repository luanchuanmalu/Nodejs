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
        console.log("call initMysqlConfig");
      }

　　　keystonemysql.queryMysqlDatabase = function(querystring, callbackfun){
        if (keystonemysql.mysql_pool) {
          keystonemysql.mysql_pool.getConnection(function(err, connection) {
            connection.query(querystring, function(err, result) {
                if(err){
                  callbackfun(err)
                }
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
        var sqlstring = 'SELECT table_schema from information_schema.`TABLES` group by table_schema;';
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun)
        console.log("call getMetadata");
      };

      keystonemysql.getDataTable = function(database,callbackfun){
        var sqlstring = "SHOW TABLES FROM JYDB";
        console.log(sqlstring);
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun);
        console.log("call getMysqlDataTable");
      };

      keystonemysql.getTableFileds = function(database,table,callbackfun){
        console.log("call getMysqlTableFileds");
        var sqlstring = "SELECT COLUMN_NAME,DATA_TYPE from information_schema.columns where table_schema = '"+database+"' and table_name='"+table+"';";
        console.log(sqlstring);
        keystonemysql.queryMysqlDatabase(sqlstring,callbackfun);
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

　　　keystonemssql.queryDatabase = function(querystring, callbackfun){
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
        var sqlstring="SELECT Name FROM Master..SysDatabases";
        keystonemssql.queryDatabase(sqlstring,callbackfun);
        console.log("call getMssqlDatabase");
      };

      keystonemssql.getDataTable = function(database,callbackfun){
        var sqlstring = "SELECT name tablename FROM "+database+"..sysobjects WHERE TYPE='U' and name not in ('dtproperties')";
        console.log(sqlstring);
        keystonemssql.queryDatabase(sqlstring,callbackfun);
        console.log("call getMetadata");
      };

      keystonemssql.getTableFileds = function(database,table,callbackfun){
        var sqlstring = "USE "+database
        +"; SELECT a.name AS fieldname,b.name AS TYPE FROM syscolumns AS a JOIN systypes AS b ON a.xtype = b.xusertype WHERE id=object_id('"
        +table+"');";
        console.log(sqlstring);
        keystonemssql.queryDatabase(sqlstring,callbackfun);
        console.log("call getMetadata");
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
