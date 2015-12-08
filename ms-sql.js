var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 11.0};Server={.};Database={test};uid=sa;PWD=1;";
sql.open(conn_str, function (err, conn) {
		if (err) {
			console.log("Error opening the connection!");
			return;
		}
		sql.queryRaw(conn_str, "select id from Product_Model WHERE MixState=0", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				for (var i = 0; i < data.rows.length; i++) {
          console.log(data.rows[i][0]);
				}

			}
		})
});
