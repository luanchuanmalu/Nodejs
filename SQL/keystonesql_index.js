var KeystoneSQL = require("./KeystoneSQL");

function sql_querycallback(err,result){
  if (err){
    console.log("sql callback err")
    return console.log(err);
  }
  if(result.datatype=="database"){
    console.log("---"+result.datatype+"---");
    for(i=0,count=result.length;i<count;i++){
      console.log(result[i].DB_NAME);
    }
  }else if (result.datatype=="table") {
    console.log("---"+result.datatype+"---");
    for(i=0,count=result.length;i<count;i++){
      console.log(result[i].TABLE_NAME);
    }
  }else if (result.datatype=="column") {
    console.log("---"+result.datatype+"---");
    for(i=0,count=result.length;i<count;i++){
      console.log(result[i].COLUMN_NAME+":"+result[i].DATA_TYPE);
    }
  }
};
//-------------------------------------mysql----------------------------------------
var mysql_config = {
    host: '192.168.58.131',
    user: 'root',
    password: 'yang',
    //database:'JYDB',
    port: 3306
};
var keystonesql=KeystoneSQL.createNew("mysql",mysql_config);
keystonesql.getDatabase(sql_querycallback);
keystonesql.getDataTable("JYDB",sql_querycallback);
keystonesql.getTableFileds("JYDB","QT_IndexQuote",sql_querycallback);
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
var keystonesql2=KeystoneSQL.createNew("mssql",mssql_config);
keystonesql2.getDatabase(sql_querycallback);
keystonesql2.getDataTable("JYDB",sql_querycallback);
keystonesql2.getTableFileds("JYDB","QT_IndexQuote",sql_querycallback);
