var connection = new ActiveXObject("ADODB.Connection") ;

var connectionstring="Data Source=<localhost>;Initial Catalog=<catalog>;User ID=<jydb>;Password=<jydb>;Provider=SQLOLEDB";

connection.Open(connectionstring);
var rs = new ActiveXObject("ADODB.Recordset");

rs.Open("SELECT Name FROM Master..SysDatabases ORDER BY Name", connection);
rs.MoveFirst
while(!rs.eof)
{
   document.write(rs.fields(1));
   rs.movenext;
}

rs.close;
connection.close;
