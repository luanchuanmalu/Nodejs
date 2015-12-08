var sql = require('mssql');

var config = {
    user: 'jydb',
    password: 'jydb',
    server: 'YANGJIANHUA', // You can use 'localhost\\instance' to connect to named instance
    database: 'JYDB',

    options: {
        //encrypt: true // Use this if you're on Windows Azure
    }
}
console.log('haha')
var connection = new sql.Connection(config, function(err) {
    // ... error checks
    // Query
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('SELECT Name FROM Master..SysDatabases', function(err, recordset) {
        // ... error checks
        console.dir(recordset);
    });

    request.query("SELECT name tablename FROM JYDB..sysobjects WHERE TYPE='U' and name not in ('dtproperties')", function(err, recordset) {
        // ... error checks
        console.dir(recordset);
    });

    request.query("USE JYDB; SELECT a.name AS fieldname,b.name AS TYPE FROM syscolumns AS a JOIN systypes AS b ON a.xtype = b.xusertype WHERE id=object_id('QT_DailyQuote')", function(err, recordset) {
        // ... error checks
        console.dir(recordset);
    });

    // Stored Procedure

    //var request = new sql.Request(connection);
    //request.input('input_parameter', sql.Int, 10);
    //request.output('output_parameter', sql.VarChar(50));
    //request.execute('procedure_name', function(err, recordsets, returnValue) {
        // ... error checks

        //console.dir(recordsets);
    //});
});

connection.on('error', function(err) {
    // ... error handler
});
