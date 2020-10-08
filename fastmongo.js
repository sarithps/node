var fastify = require('fastify')()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const port = '4444';
const hostname = 'localhost';
const url = 'mongodb://localhost:27017/task';
const dbName = 'task'


fastify.post('/concat/new', function (req, res) {
   var response = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.firstName+' '+req.body.lastName,
   };
   console.log(JSON.stringify(response));
   MongoClient.connect(url, { useUnifiedTopology: true },async function (err, client) {
      const db = client.db(dbName);
      assert.equal(null, err);
      try{
         var ret = await db.collection('users').findOneAndReplace({fullName:response.fullName}, response,{upsert:true});
      }catch(error){
         console.log('error');
      }
      if (ret.lastErrorObject.updatedExisting) {
         console.log('Already existed document updated');
      } else {
         console.log('Inserted new document');
      }

   })

   res.send(JSON.stringify(response));

})

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
   assert.equal(null, err);
   console.log("Connected successfully to server");

   const db = client.db(dbName);


   client.close();
});

fastify.listen(4444,'localhost', function (err, address) {
   if (err) {
     fastify.log.error(err)
     process.exit(1)
   }
   console.log(`server listening on ${address}`)
 })
 