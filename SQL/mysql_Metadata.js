var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '192.168.58.131',
    user: 'root',
    password: 'yang',
    //database:'JYDB',
    port: 3306
});
conn.connect();
conn.query('select table_schema from information_schema.`TABLES` group by table_schema', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
});
conn.end();
