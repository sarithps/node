var express = require('express');
var app = express();
const hostname = 'localhost';
const port = 4444;
const pino = require('pino')

app.use(function(req,res,next){
   const dest = pino.destination('/home/user/projecttest/access.log')
   dest[Symbol.for('pino.metadata')] = true
   const logger = pino(dest)
   logger.info({a: 2}, 'hi')
   next()
})

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

var server = app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });
 