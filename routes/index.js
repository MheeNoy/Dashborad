const express = require('express');
const router = express.Router();
const connect = require('../models/connect');
//const Create = require('../models/Create');
const User = require('../models/user');
//const Config = require('../views/js/CRUD');



router.get('/', (req, res, next) => {
	return res.render('index.ejs');
});


router.post('/', (req, res, next) => {
	let personInfo = req.body;

	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, (err, data) => {
				if (!data) {
					let c;
					User.findOne({}, (err, data) => {

						if (data) {
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						let newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save((err, Person) => {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', (req, res, next) => {
	
	return res.render('login.ejs');

});

router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (data) {

			if (data.password == req.body.password) {
				req.session.userId = data.unique_id;
				res.send({ "Success": "Success!" });
			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});
//var myobj = {_id:'637c958638e610190c59f1f2',Fashion:{_id:Config.id, name:Config.name}};
router.get('/profile', (req, res, next) => {
	/*connect.insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	  });*/
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/');
		} else {

			return  res.render('data.ejs', { "name": data.username, "email": data.email, "status": data.status });
			
		}
	});
});



router.post('/profile', (req, res, next) => {
	Create.find({
		 id: req.body.Id 
		 ,name: req.body.name },
		  (err, data) => {
		if (data) {
                if(data.name == req.body.name || data.Id == req.body.id)
				res.send("ข้อมูลที่ใช้ไปแล้ว กรุณาเปลี่ยน และ ID:");
		}else{	
				let newCreate = new Create({
				id: req.body.id,
				name: req.body.name,
				Price:req.body.price,
				STock: req.body.stock,
				Image:req.body.img 
			});

			newCreate.save((err, Person) => {
				if (err)
					console.log(err);
				else
					console.log('Success');
			});
			
				res.send({ "Success": "Success!" });
		
		} 
	});
});

router.get('/data', (req, res, next) => {
	connect.insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	  });
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/');
		} else {

			return  res.cookie('Cookie',data.name),
			        res.end("Cookkie"),
			        res.render('data.ejs', { "name": data.username, "email": data.email });}
	});
});



router.get('/logout', (req, res, next) => {
	
	if (req.session) {
		// delete session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/forgetpass', (req, res, next) => {
	
	return res.render("forget.ejs");
});

router.post('/forgetpass', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save((err, Person) => {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

//insert object
//myobj
//name
//insertOne
/*MongoClient.connect(url, function(err,req,res, db) {
	if (err) throw err;
	var dbo = db.db("Dashbord");
	var myobj = { name: "", address: "" };
	dbo.collection("dashbord").insertOne(myobj, function(err, res) {
	  if (err) throw err;
	  console.log("1 document inserted");
	  db.close();
	});
	//insertMany Obj
	dbo.collection("Dashbord").insertMany(myobj, function(err, res) {
	  if (err) throw err;
	  console.log("Number of documents inserted: " + res.insertedCount);
	  db.close();
	});
	
  
  
  });*/

module.exports = router;