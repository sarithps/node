var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
var port = '4444';
var hostname = 'localhost';
var url = 'mongodb://localhost:27017/task';
var dbName = 'task'


app.use(bodyParser.json());

app.post('/concat/new', function (req, res) {
   var response = {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      fullName:req.body.firstName+req.body.lastName,
   };
   console.log(JSON.stringify(response));
   MongoClient.connect(url, { useUnifiedTopology: true },async function(err,client){
      const db = client.db(dbName);
      assert.equal(null,err);
      var abc = false;
      var ret = db.collection('users').find();
      try{
         await ret.forEach(function(item){
            
            if (item.fullName==response.fullName){
               abc = true;
            }
         
         })
      }catch(error){
         console.log('Idk');
      }
   
   
      
      if (abc){
         console.log('Already exists');
        
      }
      else{
        
         db.collection('users').insertOne(response, function(err,result){
            assert.equal(null,err);
            console.log('Item inserted');
            client.close();
         })
      }
   
          
      
   })

   res.send(JSON.stringify(response));
   
})


MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
   assert.equal(null, err);
   console.log("Connected successfully to server");
   
   const db = client.db(dbName);
   
 
   client.close();
 });
 
 var server = app.listen(port, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });

