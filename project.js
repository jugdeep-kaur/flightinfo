// Sakshi Jain: c0753352
// Jugdeep Kaur : c0753604
// Shagun Sharma : c0752970

var express=require('express');
var mysql=require('mysql');
var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser')


//app.use(bodyParser());
//app.use(bodyParser.urlencoded());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));


//===========================connection is created.=======================================================================================
var connection =mysql.createConnection({

host:'localhost',
port:'3306',
user:'root',
password:'toor',
database:'flight',
multipleStatements:true
});


connection.connect(function(err){
    if (err){console.log("Connection Failed!!" + err);}
    else{console.log("Connection Successful!");}
});

//========================Add flights details using POST method============================================================================
    app.post('/addFlights', function(req, res){
        var Flight_Number = req.body.Flight_Number;
        var Duration = req.body.Duration;
        var Source = req.body.Source;
        var destination = req.body.destination;
        var Depart_Time = req.body.Depart_Time;

        console.log(Flight_Number + Duration +
                    Source + destination +
                    Depart_Time);
		

        connection.query("INSERT INTO flightinfo VALUES('" + Flight_Number + "', '" + Duration + "','" + Source + "','" + destination + "','" + Depart_Time +"')", 
        function (error, result){

            if (error){
                console.log("Query failed to execute!!" + error);
                res.send("Query Failed To Execute");
            }
            else{
                res.send("Query execute successful!");
                console.log("Query execute successful!");
            }

        }
        );   	
}   );

//============================= get the data about particular city ,on specific date and Day====================================================
	app.get('/getFlightData', function (req, res){
        var destination = req.query.destination; // destination is id of input text box
        var btndestination = req.query.btndestination; 
		if(btndestination == "Depart_Time"){
            connection.query("Select * from flightinfo where cast("+btndestination+" as date) ='"+ destination +"'",function (err, result) {
                if (err) throw err;
                res.send(result);
              });
        }else if(btndestination == "Depart_Time"){

        }else{
            connection.query("Select * from flightinfo where "+btndestination+" ='"+ destination +"'",function (err, result) {
                if (err) throw err;
				console.log(result);
                res.send(result);
              });
        }
       
       
    });

//==============================Server Listening on 8081 port================================================================================
var server = app.listen(8081, function() {
	var port = server.address().port
	var host = server.address().address
	console.log("Server is listening on: http://%s:%s", host, port)
})