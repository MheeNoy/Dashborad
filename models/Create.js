//รออัพเดท
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Schema = MongoClient.Schema;
userSchema = new Schema( {
	
	
        /*_id: Number,
        name: String,
        Price:Number,
        STock: Number,
        Image:String ,
	createdAt: {
		type: Date,
		default: Date.now
	}*/
  
        
           _id:Number,
          Type:String,
          Name:String,
          Price:Number,
          Stock:Number,
          Detail:String,
          Image:String,
           date:Date,
           Time:String

}),

Create = MongoClient.model('Create', userSchema);
module.exports.Create = Create;


//Create mongoDB

//module.exports.CreateDB = CreateDB;



