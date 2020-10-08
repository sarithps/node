var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      firstName:req.body.first_name,
      lastName:req.body.last_name,
      fullName:req.body.first_name+req.body.last_name,
      message:"This is a POST call"
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(4444, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
