var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*MongoClient.connect(MongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });*/
MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true}
    , function(err, db) {
  if (err) throw err;
  var dbo = db.db("Dashbord");
 
  dbo.collection("dashbord")
});