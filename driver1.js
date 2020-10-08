var fastify = require('fastify')()

fastify.post('drivers/create', async function (req,res) {
  const response = {
    name: req.body.name,
    mobNo: req.body.mobNo,
    dob: req.body.dob,
    ca: {
      address: req.body.address,
      city: req.body.city
    },
    s: req.body.s,
  };
  res.send(response);
})


fastify.listen(4444,'localhost', function (err, address) {
   if (err) {
     fastify.log.error(err)
     process.exit(1)
   }
   console.log(`server listening on ${address}`)
 })
 