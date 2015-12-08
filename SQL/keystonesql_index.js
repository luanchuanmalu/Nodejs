var KeystoneSQL = require("./KeystoneSQL");

//-------------------------------------mysql----------------------------------------
var mysql_config = {
    host: '192.168.58.131',
    user: 'root',
    password: 'yang',
    //database:'JYDB',
    port: 3306
};
function mysql_querycallback(err,result){
  if (err){
    console.log("mysql callback err")
    return console.log(err);
  }
  console.log("this is mysql callback")
  console.log(result);
};
var keystonesql=KeystoneSQL.createNew("mysql",mysql_config);
//keystonesql.getDatabase(mysql_querycallback);
//keystonesql.getDataTable("JYDB",mysql_querycallback);
keystonesql.getTableFileds("JYDB","QT_IndexQuote",mysql_querycallback);
//------------------------------mssql----------------------------------------
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
var keystonesql2=KeystoneSQL.createNew("mssql",mssql_config);
//keystonesql2.getDatabase(mssql_querycallback);
//keystonesql2.getDataTable("JYDB",mssql_querycallback);
keystonesql2.getTableFileds("JYDB","QT_IndexQuote",mssql_querycallback);
