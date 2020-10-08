const fastify = require('fastify')()
 
fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
 
fastify.get('/concat', (req, reply) => {
  const { redis } = fastify
  redis.get(req.query.firstName, (err, val) => {
    reply.send(err || val)
  })
})
 
fastify.post('/concat/new', (req, reply) => {
  const { redis } = fastify
  redis.set(req.body.key, req.body.value, (err,val) => {
    reply.send(err || val)
  })
})
 
fastify.listen(4444, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})