var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/task.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "task.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      firstName:req.query.first_name,
      lastName:req.query.last_name,
      fullName:req.query.first_name+req.query.last_name,
      message:"This is a GET call"
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(4444, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
