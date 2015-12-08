var sql = require('mssql');
var mysql = require('mysql');

mssql_config=null;
mysql_pool=null;

//----------------------------MYSQL-----------------
//mysql pool
function initMysqlConfig(config) {
  try {
    mysql_pool=mysql.createPool(config);
  } catch (e) {
    console.log("connect err");
  } finally {
    console.log("call initMysqlConfig");
  }
};
//QUERY MYSQL DATABASE
function queryMysqlDatabase(querystring, callbackfun) {
  if (mysql_pool) {
    mysql_pool.getConnection(function(err, connection) {
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
//GET DATABASES
function getMysqlDatabase(callbackfun) {
  var sqlstring = 'SELECT table_schema from information_schema.`TABLES` group by table_schema;';
  queryMysqlDatabase(sqlstring,callbackfun)
  console.log("call getMetadata");
};
//GET TABLE NAMES
function getMysqlDataTable(database,callbackfun) {
  var sqlstring = "SHOW TABLES FROM JYDB";
  console.log(sqlstring);
  queryMysqlDatabase(sqlstring,callbackfun);
  console.log("call getMysqlDataTable");
};
//GET FILEDS
function getMysqlTableFileds(database,table,callbackfun) {
  console.log("call getMysqlTableFileds");
  var sqlstring = "SELECT COLUMN_NAME,DATA_TYPE from information_schema.columns where table_schema = '"+database+"' and table_name='"+table+"';";
  console.log(sqlstring);
  queryMysqlDatabase(sqlstring,callbackfun);
};
//----------------------------MSSQL-----------------
//mssql config
function initMssqlConfig(config, callbackfun) {
  mssql_config=config;
  console.log("call getMetadata");
};
//MSSQL query
function queryDatabase(querystring, callbackfun) {
  if (mssql_config) {
      var connection = new sql.Connection(this.mssql_config, function(err) {
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
//database name
function getMssqlDatabase(callbackfun) {
  var sqlstring="SELECT Name FROM Master..SysDatabases";
  queryDatabase(sqlstring,callbackfun);
  console.log("call getMssqlDatabase");
};
//data tables name
function getMssqlDataTable(database,callbackfun) {
  var sqlstring = "SELECT name tablename FROM "+database+"..sysobjects WHERE TYPE='U' and name not in ('dtproperties')";
  console.log(sqlstring);
  queryDatabase(sqlstring,callbackfun);
  console.log("call getMetadata");
};
function getMssqlTableFileds(database,table,callbackfun) {
  var sqlstring = "USE "+database
  +"; SELECT a.name AS fieldname,b.name AS TYPE FROM syscolumns AS a JOIN systypes AS b ON a.xtype = b.xusertype WHERE id=object_id('"
  +table+"');";
  console.log(sqlstring);
  queryDatabase(sqlstring,callbackfun);
  console.log("call getMetadata");
};

//export the function
exports.initMysqlConfig=initMysqlConfig
exports.getMysqlDatabase=getMysqlDatabase
exports.getMysqlDataTable = getMysqlDataTable;
exports.getMysqlTableFileds = getMysqlTableFileds;
//
exports.initMssqlConfig = initMssqlConfig;
exports.getMssqlDatabase = getMssqlDatabase;
exports.getMssqlDataTable = getMssqlDataTable;
exports.getMssqlTableFileds= getMssqlTableFileds;
