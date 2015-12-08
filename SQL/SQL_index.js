var sql = require("./SQL_Metadata");

//------------MSSQL------------------------------------------------------
var mssql_config = {
    user: 'jydb',
    password: 'jydb',
    server: 'YANGJIANHUA', // You can use 'localhost\\instance' to connect to named instance
    //database: 'JYDB',

    options: {
        //encrypt: true // Use this if you're on Windows Azure
    }
}
function mssql_querycallback(err,recordset){
  if (err){
    console.log("mssql callback err")
    return console.log(err);
  }
  console.log("this is mssql callback")
  console.log(recordset);
};
//sql.initMssqlConfig(mssql_config);
//sql.getMetadatabase(mssql_querycallback);
//sql.getMetadatatable('JYDB',mssql_querycallback);
//sql.getMssqlTableFileds('JYDB','QT_IndexQuote',mssql_querycallback)
//------------MYSQL------------------------------------------------------
var mysql_config = {
    host: '192.168.58.131',
    user: 'root',
    password: 'yang',
    //database:'JYDB',
    port: 3306
}
function mysql_querycallback(err,result){
  if (err){
    console.log("mysql callback err")
    return console.log(err);
  }
  console.log("this is mysql callback")
  console.log(result);
};
sql.initMysqlConfig(mysql_config)
sql.getMysqlDatabase(mysql_querycallback)
//sql.getMysqlDataTable('JYDB',mysql_querycallback)
//sql.getMysqlTableFileds('JYDB','QT_IndexQuote',mysql_querycallback)
