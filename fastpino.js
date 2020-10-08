var fastify = require('fastify')()
const hostname = 'localhost';
const port = 4444;
const pino = require('pino')

fastify.use(function(req,res,next){
   const dest = pino.destination('/home/user/projecttest/access.log')
   dest[Symbol.for('pino.metadata')] = true
   const logger = pino(dest)
   logger.info({a: 2}, 'hi')
   next()
})

fastify.get('/concat', function (req, res) {
   response = {
      firstName:req.query.firstName,
      lastName:req.query.lastName,
      fullName:req.query.firstName+req.query.lastName,
      message:"This is a GET call"
   };
   console.log(JSON.stringify(response));
   res.send(JSON.stringify(response));
   
})

fastify.listen(4444,'localhost', function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`)
  })
  