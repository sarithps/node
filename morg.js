var express = require('express');
var app = express();
const hostname = 'localhost';
const port = 4444;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.get('/concat', function (req, res) {
   response = {
      firstName:req.query.firstName,
      lastName:req.query.lastName,
      fullName:req.query.firstName+req.query.lastName,
      message:"This is a GET call"
   };
   console.log(JSON.stringify(response));
   res.end(JSON.stringify(response));
   
})

app.post('/concat/new', function (req, res) {
      response = {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      fullName:req.body.firstName+req.body.lastName,
      message:"This is a POST call"
   };
   console.log(JSON.stringify(response));
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(response));
   
})



var server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
